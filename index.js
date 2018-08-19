// 'use strict';

const debug = require('debug')('git-organized:index')

const findGitRepos = require('find-git-repos');
const gitUrlParse = require("git-url-parse");

const path = '/Users/chris/src/temp'

var em = findGitRepos(path);

em.on('repo', function (repo, remote) {
  let obj = {
    remote: remote,
    repo: repo,
  }
  if(remote){
    obj.git=gitUrlParse(String(remote))
  }
  debug('obj %O', obj)
}
);

em.on('end', function () {
  console.log('all done!');
})

em.on('error', function () {
  console.log('the path i specified must not exist or is in accesible');
});

module.exports = x => x;
