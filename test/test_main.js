module('retrieval', {
	setup: function() {
		tiddlymerge.setBag(new tiddlyweb.Bag('foo_public', '/'));
	}
});

test('getPullRequests exists', function() {
	strictEqual(typeof tiddlymerge.getPullRequests, 'function', 'There is a getPullRequests function');
});

test('return tiddlers', function() {
	$.mockjax({
		url: '/search?*',
		responseText: $.fixtures.remoteTiddlers
	});

	expect(4);
	tiddlymerge.getPullRequests($.fixtures.localTiddlers, function(tiddlers) {
		strictEqual(tiddlers.length, 3, 'there are 3 pull requests');
		strictEqual(tiddlers[0].fields._push, 'foo_public/foo', 'the pull requests are for our local tiddlers');
		strictEqual(tiddlers[1].fields._push, 'foo_public/bar', 'the pull requests are for our local tiddlers');
		strictEqual(tiddlers[2].fields._push, 'foo_public/bax', 'the pull requests are for our local tiddlers');
		start();
	});

	stop();
});

module('diffing', {});

test('simple diff', function() {
	var tid1 = $.fixtures.localTiddlers[0];
	var tid2 = $.fixtures.remoteTiddlers[0];
	var diffTid = tiddlymerge.diff(tid1, tid2);
	strictEqual(diffTid.title.length, 1, 'title length check');
	strictEqual(diffTid.title[0][0], 0, 'there are no differences');
	strictEqual(diffTid.title[0][1], 'foo', 'the title is foo');
	strictEqual(diffTid.text.length, 3, 'text length check');
	strictEqual(diffTid.text[0][0], 0, 'there are no differences');
	strictEqual(diffTid.text[0][1], 'foo bar ba', 'this is the same');
	strictEqual(diffTid.text[1][0], -1, 'the last character is different');
	strictEqual(diffTid.text[1][1], 'x', 'the last character is different');
	strictEqual(diffTid.text[2][0], 1, 'the last character is different');
	strictEqual(diffTid.text[2][1], 'z', 'the last character is different');
	strictEqual(diffTid.tags.length, 2, 'tags length check');
	strictEqual(diffTid.tags[0][0][0], 0, 'the first tag is the same');
	strictEqual(diffTid.tags[1][0][0], 1, 'the second tag is different');
	strictEqual(diffTid.fields._push, undefined, 'the _push field is not included');
	strictEqual(diffTid.fields['server.foo'], undefined, 'the server.foo field is not included');
	strictEqual(typeof diffTid.fields.myField, 'object', 'the myField field is included');
});

test('html diff', function() {
	var tid1 = $.fixtures.localTiddlers[0];
	var tid2 = $.fixtures.remoteTiddlers[0];
	var diffTid = tiddlymerge.diff(tid1, tid2);
	var prettyDiff = tiddlymerge.renderDiff(diffTid);

	strictEqual(prettyDiff.title, '<span>foo</span>', 'title is pretty printed');
	strictEqual(prettyDiff.text, '<span>foo bar ba</span><del style=\"background:#ffe6e6;\">x</del><ins style=\"background:#e6ffe6;\">z</ins>', 'text is pretty printed');

	strictEqual(prettyDiff.tags[0], '<span>foo</span>', 'tag 1 is pretty printed');
	strictEqual(prettyDiff.tags[1], '<ins style=\"background:#e6ffe6;\">bar</ins>', 'tag 2 is pretty printed');

	strictEqual(prettyDiff.fields.myField, '<span>fi</span><del style=\"background:#ffe6e6;\">l</del><span>e</span><ins style=\"background:#e6ffe6;\">l</ins><span>d text</span>', 'myField is pretty printed');
});
