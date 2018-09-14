#!/usr/bin/env node

const path = require('path')
const debug = require('debug')('git-organized:repo')
const gitUrlParse = require('git-url-parse')

export function getBaseSrcDirectory() {
    /* eslint-disable-next-line no-undef */
    const baseSrcDirectory = process.env['GIT_ORGANIZED_SRC'] || path.join(process.env['GOPATH'], 'src') || path.join(require('os').homedir(), 'src')
    debug('baseSrcDirectory: %O', baseSrcDirectory)
    return baseSrcDirectory
}

export function buildDirectoryPath(repo, srcPath) {
    const parsedRepo = gitUrlParse(String(repo))
    debug('repo: %O', parsedRepo)
    const repoPath = path.join(
        String(srcPath),
        String(parsedRepo.resource),
        String(parsedRepo.full_name)
    )
    return repoPath
}
