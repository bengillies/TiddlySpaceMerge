TiddlySpaceMerge
================

Do diffing and merging of Tiddlers within TiddlySpace.

User as follows:

Specify which bag you are pulling into (required):

	tiddlymerge.setBag(bag); // bag is a chrjs bag

Get a list of tiddlers that want to be pulled (signified by the prescence of a _push field containing a reference to the aforementioned bag):

	tiddlymerge.getPullRequests(tiddlers); // tiddlers is a list of tiddlers you want to check against

Perform a diff (returns a tiddler-like object with diffs in each property):

	tiddlymerge.diff(tid1, tid2);

Render the diff in HTML (returns a tiddler-like object with HTML in each property):

	tiddlymerge.renderDiff(diff); // diff is the diff retruned by tiddlymerge.diff

Merge the tiddler diff (returns null if the merge fails):

	tiddlymerge.merge(diff, tid); // returns a new chrjs tiddler or null
