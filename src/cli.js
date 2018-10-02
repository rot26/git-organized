#!/usr/bin/env node

'use strict'

const debug = require('debug')('git-organized:cli')

const path = require('path')

const program = require('commander')
const gitUrlParse = require('git-url-parse')
const cmd = require('node-cmd')
const simpleGit = require('simple-git/promise')()

import {
    buildDirectoryPath,
    getFirstSrcDirectory,
    getSrcFromEnvVar,
    getSrcFromGoPathEnvVar,
    getSrcFromStaticDefault,
} from './repo'


function directoryExists(directoryPath){

}
// function checkDirectoryEmpty(directoryPath){
// }

function cloneRepo(repoUrl, targetPath) {
    simpleGit
        .clone(
            repoUrl,
            targetPath
        )
        .then(
            (err, result) => debug('cloned: %O %O', err, result)
        )
        .catch(
            (err) => {
                debug('err: %O',err)
                // if (err.indexOf('already exists and is not an empty directory') == -1) {
                //     return debug('cloud not clone')
                // }
                // return debug('failed: %o', err)
            }
        )

    // cmd.get(
    //     `
    //     git clone ${repoUrl} ${targetPath}
    // `,
    //     function (err, data, stderr) {
    //         debug('err: %O', err)
    //         debug('data: %o', data)
    //         debug('stderr: %O', stderr)

    //         if (!err) {
    //             /* eslint-disable-next-line no-console */
    //             console.log('the node-cmd cloned dir contains these files :\n\n', data)
    //         } else {
    //             /* eslint-disable-next-line no-console */
    //             console.log('error', err)
    //         }

    //     }
    // )

}

program
    .command('clone [repo]')
    .alias('c')
    .description('clone git repository into go-like organized structure')
    .action(
        (repo) => {
            const directoryPath = buildDirectoryPath(repo)

            cloneRepo(repo, directoryPath)

            debug('directoryPath: %O', directoryPath)

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

            debug('directoryPath: %O', directoryPath)

        }
    )

program
    .version('0.1.0')
    .description('organize git repositories into go-like organized structure')
    /* eslint-disable-next-line no-undef */
    .parse(process.argv)


/* eslint-disable-next-line no-undef */
if (!process.argv.slice(2).length) {
    program.outputHelp()
}
