.PHONY: remotes test

lib:
	mkdir lib

remotes: lib
	curl -o lib/diff_match_patch.js \
		http://google-diff-match-patch.googlecode.com/svn/trunk/javascript/diff_match_patch.js
	curl -o lib/chrjs.js \
		https://raw.github.com/tiddlyweb/chrjs/master/main.js
	curl  -o test/lib/jquery.mockjax.js \
		https://raw.github.com/appendto/jquery-mockjax/master/jquery.mockjax.js

test:
	qunit test/index.html
