var Session = require('../Session.js');
var assert = require('assert');

describe('Session Object Initialization', function() {

	it('Session object and properties', function() {
		var objSession = new Session({}, {});
		assert.equal('object', typeof objSession);
		assert.equal('undefined', typeof objSession.objConfig);
		assert.equal('object', typeof objSession.m_objRequest);
		assert.equal('object', typeof objSession.m_objResponse);
		assert.equal('object', typeof objSession.m_objCookie);
		assert.equal('object', typeof objSession.m_strSessionId);
		assert.equal('object', typeof objSession.m_reValidName);
		assert.equal('string', typeof objSession.m_strIdKey);
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal('undefined', typeof arrSessions);
	});

	it('Session object and properties with empty config', function() {
		var objSession = new Session({}, {}, {});
		assert.equal('object', typeof objSession);
		assert.equal('undefined', typeof objSession.objConfig);
		assert.equal('object', typeof objSession.m_objRequest);
		assert.equal('object', typeof objSession.m_objResponse);
		assert.equal('object', typeof objSession.m_objCookie);
		assert.equal('object', typeof objSession.m_strSessionId);
		assert.equal('object', typeof objSession.m_reValidName);
		assert.equal('string', typeof objSession.m_strIdKey);
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal('undefined', typeof arrSessions);
	});

	it('Session config nameValidator with valid value', function() {
		var objSession = new Session({}, {}, {'nameValidator': /^[A-Z]+$/});
		assert.equal('object', typeof objSession.m_reValidName);
		assert.equal('/^[A-Z]+$/', objSession.m_reValidName);
	});

	it('Session config nameValidator with blank value', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'nameValidator': ''});
			}, 
			function(err) {
				if((err instanceof TypeError) && /regular expression/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config nameValidator with string value', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'nameValidator': '/^[A-Z]+$/'});
			}, 
			function(err) {
				if((err instanceof TypeError) && /regular expression/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config nameValidator with numeric value', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'nameValidator': 10});
			}, 
			function(err) {
				if((err instanceof TypeError) && /regular expression/.test(err)) return true;
			},
			'unexpected error'
		);
	});
	
	//it('Session config nameValidator with incorrect regular expression value', function() {
	//	assert.throws(
	//		function() {
	//			new Session({}, {}, {'nameValidator': {}});
	//		}, 
	//		function(err) {
	//			if((err instanceof TypeError) && /regular expression/.test(err)) return true;
	//		},
	//		'unexpected error'
	//	);
	//});

	it('Session config sessionKey with valid value', function() {
		var objSession = new Session({}, {}, {'sessionKey': 'ABCD'});
		assert.equal('string', typeof objSession.m_strIdKey);
		assert.equal('ABCD', objSession.m_strIdKey);
	});

	it('Session config sessionKey with blank value', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionKey': ''});
			}, 
			function(err) {
				if((err instanceof TypeError) && /Invalid sessionKey value/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionKey with numeric value', function() {
		var objSession = new Session({}, {}, {'sessionKey': 1000});
		assert.equal('number', typeof objSession.m_strIdKey);
		assert.equal(1000, objSession.m_strIdKey);
	});

	it('Session config sessionKey with object value', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionKey': {}});
			}, 
			function(err) {
				if((err instanceof TypeError) && /Invalid sessionKey value/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionKey with special characters value', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionKey': '!%'});
			}, 
			function(err) {
				if((err instanceof TypeError) && /Invalid sessionKey value/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionKey as per nameValidator setting case 1', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'nameValidator': /^[\W]+$/, 'sessionKey': 'ABCD'});
			}, 
			function(err) {
				if((err instanceof TypeError) && /Invalid sessionKey value/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionKey as per nameValidator setting case 2', function() {
		var objSession = new Session({}, {}, {'nameValidator': /^[\w!%]+$/, 'sessionKey': '!%'});
		assert.equal('string', typeof objSession.m_strIdKey);
		assert.equal('!%', objSession.m_strIdKey);
	});

	it('Session config sessionIdSize with blank value', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': ''});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with string value case 1', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': 'ABCD'});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with string value case 2', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': '12A'});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with int value as string case 1', function() {
		var objSession = new Session({}, {}, {'sessionIdSize': '10'});
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal(10, objSession.m_intSessionIdSize);
	});

	it('Session config sessionIdSize with int value as string case 2', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': '100'});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with float value as string case 1', function() {
		var objSession = new Session({}, {}, {'sessionIdSize': '10.5'});
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal(10, objSession.m_intSessionIdSize);
	});

	it('Session config sessionIdSize with float value as string case 2', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': '100.01'});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with int value as 0', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': 0});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with int value as 1', function() {
		var objSession = new Session({}, {}, {'sessionIdSize': 1});
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal(1, objSession.m_intSessionIdSize);
	});

	it('Session config sessionIdSize with int value as 50', function() {
		var objSession = new Session({}, {}, {'sessionIdSize': 50});
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal(50, objSession.m_intSessionIdSize);
	});

	it('Session config sessionIdSize with int value as 99', function() {
		var objSession = new Session({}, {}, {'sessionIdSize': 99});
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal(99, objSession.m_intSessionIdSize);
	});

	it('Session config sessionIdSize with int value as 100', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': 100});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with float value as 0.5', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': 0.5});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with float value as 1.6', function() {
		var objSession = new Session({}, {}, {'sessionIdSize': 1.6});
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal(1, objSession.m_intSessionIdSize);
	});

	it('Session config sessionIdSize with float value as 50.7', function() {
		var objSession = new Session({}, {}, {'sessionIdSize': 50.7});
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal(50, objSession.m_intSessionIdSize);
	});

	it('Session config sessionIdSize with float value as 99.99', function() {
		var objSession = new Session({}, {}, {'sessionIdSize': 99.99});
		assert.equal('number', typeof objSession.m_intSessionIdSize);
		assert.equal(99, objSession.m_intSessionIdSize);
	});

	it('Session config sessionIdSize with float value as 100.01', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': 100.01});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});

	it('Session config sessionIdSize with object value', function() {
		assert.throws(
			function() {
				new Session({}, {}, {'sessionIdSize': {}});
			}, 
			function(err) {
				if((err instanceof TypeError) && /sessionIdSize should be numeric/.test(err)) return true;
			},
			'unexpected error'
		);
	});
});