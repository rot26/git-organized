#!/usr/bin/env node

import {
    getBaseSrcDirectory,
    buildDirectoryPath,
} from './repo'

const path = require('path')
const os = require('os')

describe('buildDirectoryPath', () => {

    describe('with repository git@github.com:rot26/git-organized.git', () => {
        const repository = 'git@github.com:rot26/git-organized.git'

        test('with no prefix', () => {
            const expectedRepositoryPath = 'github.com/rot26/git-organized'
            const repositoryPath = buildDirectoryPath(repository, '')

            return expect(repositoryPath).toBe(expectedRepositoryPath)

        })

        test('with "src" prefix', () => {
            const expectedRepositoryPath = 'src/github.com/rot26/git-organized'
            const repositoryPath = buildDirectoryPath(repository, 'src')

            return expect(repositoryPath).toBe(expectedRepositoryPath)

        })

        test('with number prefix', () => {
            const expectedRepositoryPath = '1/github.com/rot26/git-organized'
            const repositoryPath = buildDirectoryPath(repository, 1)

            return expect(repositoryPath).toBe(expectedRepositoryPath)

        })

    })

    describe('https://github.com/rot26/git-organized.git', () => {

        const repository = 'https://github.com/rot26/git-organized.git'

        test('with no prefix', () => {
            const expectedRepositoryPath = 'github.com/rot26/git-organized'
            const repositoryPath = buildDirectoryPath(repository, '')

            return expect(repositoryPath).toBe(expectedRepositoryPath)

        })

        test('with "src" prefix', () => {
            const expectedRepositoryPath = 'src/github.com/rot26/git-organized'
            const repositoryPath = buildDirectoryPath(repository, 'src')

            return expect(repositoryPath).toBe(expectedRepositoryPath)

        })

        test('with number prefix', () => {
            const expectedRepositoryPath = '1/github.com/rot26/git-organized'
            const repositoryPath = buildDirectoryPath(repository, 1)

            return expect(repositoryPath).toBe(expectedRepositoryPath)

        })

    })

})

describe('getBaseSrcDirectory()', () => {

    test.skip('command line argument', () => {
        const gitOrganizedSrc = process.env['GIT_ORGANIZED_SRC']

        return expect(getBaseSrcDirectory()).toBe(gitOrganizedSrc)
    })

    test.skip('environment variable', () => {
        const gitOrganizedSrc = process.env['GIT_ORGANIZED_SRC']

        return expect(getBaseSrcDirectory()).toBe(gitOrganizedSrc)
    })

    test.skip('fallback to go path', () => {
        const goPath = path.join(process.env['GOPATH'], 'src')

        return expect(getBaseSrcDirectory()).toBe(goPath)
    })

    test('final fallback to `$home/src`', () => {
        const osHome = os.homedir()
        const defaultPath = path.join(osHome, 'src')

        return expect(getBaseSrcDirectory()).toBe(defaultPath)

    })

})
