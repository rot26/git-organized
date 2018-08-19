#!/usr/bin/env node
'use strict';

const debug = require('debug')('git-organized:cli')

const path = require('path')

const program = require('commander');
const gitUrlParse = require("git-url-parse");

function getBaseSrcDirectory() {
    const baseSrcDirectory = process.env['GIT_ORGANIZED_SRC'] || path.join(process.env['GOPATH'],'src') || path.join(require('os').homedir(), 'src')
    debug('baseSrcDirectory: %O', baseSrcDirectory)
    return baseSrcDirectory
}

function buildDirectoryPath(repo) {
    const parsedRepo = gitUrlParse(String(repo))
    debug('repo: %O', parsedRepo)

    const repoPath = path.join(
        String(getBaseSrcDirectory()),
        String(parsedRepo.resource),
        String(parsedRepo.full_name),
    )

    return repoPath

}

function cloneRepo(repoUrl,targetPath){

}

program
    .command('clone [repo]')
    .alias('c')
    .description('clone git repository into go-like organized structure')
    .action(
        (repo) => {
            const directoryPath = buildDirectoryPath(repo)

            

            debug('directoryPath: %O',directoryPath)

        }
    )

program
    .command('move')
    .alias('m')
    .description('move git repository into go-like organized structure')

program
    .command('check [repo]')
    .alias('k')
    .description('check git url')
    .action(
        (repo) => {
            const directoryPath = buildDirectoryPath(repo)

            debug('directoryPath: %O',directoryPath)

        }
    )

// program
//     .outputHelp()

program
    .version('0.1.0')
    .description('organize git repositories into go-like organized structure')
    .parse(process.argv);


if (!process.argv.slice(2).length) {
    program.outputHelp();
}