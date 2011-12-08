$.fixtures = {
	localTiddlers: [
		new tiddlyweb.Tiddler({
			title: 'foo',
			text: 'foo bar bax',
			tags: ['foo'],
			bag: new tiddlyweb.Bag('foo_public', '/'),
			fields: { myField: 'filed text' }
		}),
		new tiddlyweb.Tiddler({
			title: 'bar',
			text: 'Some txet in heer that needs changing',
			tags: ['foo'],
			bag: new tiddlyweb.Bag('foo_public', '/'),
			fields: { myField: 'filed text' }
		}),
		new tiddlyweb.Tiddler({
			title: 'bax',
			text: 'Thsi txe si wrnog',
			tags: ['foo'],
			bag: new tiddlyweb.Bag('foo_public', '/'),
			fields: { myField: 'filed text' }
		})
	],
	remoteTiddlers: [
		new tiddlyweb.Tiddler({
			title: 'foo',
			text: 'foo bar baz',
			tags: ['foo', 'bar'],
			bag: new tiddlyweb.Bag('bar_public', '/'),
			fields: {
				myField: 'field text',
				_push: 'foo_public/foo',
				'server.foo': 'set by the server'
			}
		}),
		new tiddlyweb.Tiddler({
			title: 'bar',
			text: 'Some text in here that needs changing',
			tags: ['foo', 'bar'],
			bag: new tiddlyweb.Bag('bar_public', '/'),
			fields: {
				myField: 'field text',
				_push: 'foo_public/bar'
			}
		}),
		new tiddlyweb.Tiddler({
			title: 'baz',
			text: 'This text is wrong',
			tags: ['foo', 'bar'],
			bag: new tiddlyweb.Bag('bar_public', '/'),
			fields: {
				myField: 'field text',
				_push: 'foo_public/bax'
			}
		})
	]
};
