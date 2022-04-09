// Invoke with node ./scripts/publish.js
// This will be a script that presents the user with a list of files in data/blog/drafts
// Selected post will
// 1. have its frontmatter draft key set to true
// 2. be moved into the parent directory /data/blog

// Edge cases
// 1. Empty drafts directory
// 2. No draft key in the YAML
// 3. No YAML full stop (what if we've just dropped a plain .txt file in the drafts folder?)

// Possible additional features 
// 1. Allow user to publish to different pages etc
