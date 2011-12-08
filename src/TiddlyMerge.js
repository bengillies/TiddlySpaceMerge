/*
 * TiddlyMerge - Search for tiddlers waiting to be pulled,
 * show diffs, and then patch the original tiddlers
 *
 * Requires:
 *		http://google-diff-match-patch.googlecode.com/
 *		https://github.com/tiddlyweb/chrjs
 *
 * written by Ben Gillies
 */

window.tiddlymerge = (function() {

	var bag;

	var dmp = new diff_match_patch();

	$.ajaxSetup({
		beforeSend: function(xhr) {
			xhr.setRequestHeader('X-ControlView', 'false');
		}
	});

	var getPullRequests = function(tiddlers, callback) {
		// turn tiddlers into keys compatible with _push field syntax
		tiddlers = $.map(tiddlers, function(tid) {
			return (tid.bag && tid.bag.name) + '/' +
				encodeURIComponent(tid.title);
		});

		var search = new tiddlyweb.Search('/search?q=_push:*' + bag.name + '/*',
				bag.host)
			.get(function(pullRequests) {
				var res = [];
				$.each(pullRequests, function(i, tid) {
					var _pushes = tid.fields._push.split(',');
					$.each(_pushes, function(i, push) {
						if (~tiddlers.indexOf(push)) {
							res.push(tid);
							return false;
						}
					});
				});

				callback(res);
			});
	};

	var setBag = function(_bag) {
		bag = _bag;
	};

	var diff = function(tid1, tid2) {
		var diffTid = {};
		diffTid.title = dmp.diff_main(tid1.title, tid2.title);
		diffTid.text = dmp.diff_main(tid1.text, tid2.text);
		diffTid.tags = [];
		diffTid.fields = {};
		$.each((tid1.tags.length > tid2.tags.length) ? tid1.tags : tid2.tags,
			function(i) {
				diffTid.tags.push(dmp.diff_main((tid1.tags[i] || ''),
					(tid2.tags[i] || '')));
			});
		$.each(tid1.fields, function(k) {
			if (!/^(_|server.)/.test(k)) {
				diffTid.fields[k] = dmp.diff_main(tid1.fields[k], tid2.fields[k] || '');
			}
		});
		$.each(tid2.fields, function(k) {
			if (!/^(_|server.)/.test(k) && !diffTid.fields[k]) {
				diffTid.fields[k] = dmp.diff_main(tid2.fields[k], '');
			}
		});

		return diffTid;
	};

	var renderDiff = function(diffTid) {
		var renderTid = {};

		renderTid.title = dmp.diff_prettyHtml(diffTid.title);
		renderTid.text = dmp.diff_prettyHtml(diffTid.text);
		renderTid.tags = [];
		renderTid.fields = {};
		$.each(diffTid.tags, function(i, tag) {
			renderTid.tags.push(dmp.diff_prettyHtml(tag));
		});
		$.each(diffTid.fields, function(k, v) {
			renderTid.fields[k] = dmp.diff_prettyHtml(v);
		});

		return renderTid;
	};

	return {
		getPullRequests: getPullRequests,
		setBag: setBag,
		diff: diff,
		renderDiff: renderDiff
	};

}());
