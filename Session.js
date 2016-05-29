/**
 * A simple session management utility
 */
'use strict';

var Cookie		= require('litchi-cookie');
var arrSessions = {};

var Session = function(objRequest, objResponse, objConfig) {
	objConfig = objConfig || {};
	
	this.m_objRequest 	= objRequest;
	this.m_objResponse 	= objResponse;
	this.m_objCookie 	= new Cookie(objRequest, objResponse);
	
	this.m_strSessionId = null;
	
	this.m_reValidName 	= /^[\w]+$/;
	// override vaidation regular expression as per user configuration
	if('undefined' !== typeof objConfig.nameValidator && null !== objConfig.nameValidator) {
		if('object' !== typeof objConfig.nameValidator) {
			throw new TypeError('Invalid regular expression object for nameValidator');
		}
		this.m_reValidName = objConfig.nameValidator;
	}
	
	this.m_strIdKey		= '_NSID';
	// override session key name as per user configuration
	if('undefined' !== typeof objConfig.sessionKey && null !== objConfig.sessionKey) {
		if(false === this.m_reValidName.test(objConfig.sessionKey)) {
			throw new TypeError('Invalid sessionKey value: ' + objConfig.sessionKey + ' as per nameValidator: ' + this.m_reValidName.toString());
		}
		this.m_strIdKey = objConfig.sessionKey;
	}
		
	this.m_intSessionIdSize = 40;
	// override session key size as per user configuration
	if('undefined' !== typeof objConfig.sessionIdSize && null !== objConfig.sessionIdSize) {
		if(true === isNaN(objConfig.sessionIdSize) || 1 > Math.floor(objConfig.sessionIdSize) || 99 < Math.floor(objConfig.sessionIdSize)) {
			throw new TypeError('sessionIdSize should be numeric and between 1 to 99');
		}
		this.m_intSessionIdSize = Math.floor(objConfig.sessionIdSize);
	}
};

Session.prototype.start = function() {
	var strSessionId = this.m_objCookie.get(this.m_strIdKey);

	if(null !== strSessionId && 'undefined' !== typeof arrSessions[strSessionId]) {
		// session exists
		this.m_strSessionId = strSessionId;
		return true;
	}

	this.m_strSessionId = this.generateSessionId();
	
	try {
		this.m_objCookie.set(this.m_strIdKey, this.m_strSessionId);
		arrSessions[this.m_strSessionId] = {'_son' : Date.now()};
	} catch(e) {
		throw new Error('Failed to start session: ' + e );
	}
};

Session.prototype.set = function(strKey, mixValue) {
	// check if given key is valid name
	if(false === this.m_reValidName.test(strKey)) {
		throw new TypeError('Invalid session name' + strKey);
	}
	
	// start session if not exists
	if(null === this.m_strSessionId) this.start();
	
	arrSessions[this.m_strSessionId][strKey] = mixValue;
	arrSessions[this.m_strSessionId]['_laon'] = Date.now();
};

// get specific session values by key
Session.prototype.get = function(strKey) {
	// start session if not exists
	if(null === this.m_strSessionId) this.start();
	
	if(0 === arrSessions.length) return null;
	
	arrSessions[this.m_strSessionId]['_laon'] = Date.now();	
	return arrSessions[this.m_strSessionId][strKey];
};

Session.prototype.destroy = function() {
	delete arrSessions[this.m_strSessionId];
};

// generate random session id
Session.prototype.generateSessionId = function() {
	var str = 'abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ_0123456789';
    var strSessionId = '';
	for(var i = 0; i < this.m_intSessionIdSize; i++) {
		var intNum = Math.floor(Math.random() * str.length);
		strSessionId += str.substring(intNum, intNum + 1);
	}

	if(null !== arrSessions && 'undefined' !== typeof arrSessions[strSessionId]) {
        return this.generateSessionId(); // recursion to get unique session
    }

	return strSessionId;
};

// get the count of active sessions
Session.prototype.count = function() {
	return Object.getOwnPropertyNames(arrSessions).length;
};

// Dump the whole sesions for debug
Session.prototype.dump = function() {
	console.log(arrSessions);
};

module.exports = Session;