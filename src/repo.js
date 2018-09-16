#!/usr/bin/env node

const path = require('path')
const debug = require('debug')('git-organized:repo')
const gitUrlParse = require('git-url-parse')

export function getFirstSrcDirectory(paths) {
    debug('getFirstSrcDirectory: paths: %O', path)
    return paths.reduce(
        (accumulator, currentValue) => {
            debug('accumulator %O', accumulator)
            return (typeof accumulator === 'function') ? accumulator() : accumulator || currentValue
        }
    )
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
