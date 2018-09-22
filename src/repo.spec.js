#!/usr/bin/env node

import {
    buildDirectoryPath,
    getFirstSrcDirectory,
    getSrcFromEnvVar,
    getSrcFromGoPathEnvVar,
    getSrcFromStaticDefault,
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

describe('getFirstSrcDirectory()', () => {

    test('should choose first defined path in array', () => {
        const defaultPaths = [
            null,
            '/path/2',
            '/path/3',
        ]

        expect(getFirstSrcDirectory(defaultPaths)).toBe('/path/2')
        expect(getFirstSrcDirectory(defaultPaths)).not.toBe(null)
        expect(getFirstSrcDirectory(defaultPaths)).not.toBe('/path/3')
        return
    })

    test('should choose first function value in array', () => {
        const defaultPaths = [
            () => '/path/1',
            null,
            '/path/3',
        ]

        expect(getFirstSrcDirectory(defaultPaths)).toBe('/path/1')
        expect(getFirstSrcDirectory(defaultPaths)).not.toBe(null)
        expect(getFirstSrcDirectory(defaultPaths)).not.toBe('/path/3')
        return
    })


})

describe('getSrcFromEnvVar()', () => {

    test('should return path when GIT_ORGANIZED_SRC_DIR is set', () => {
        const processMock = {
            env: () => '/path/set/by/env'
        }
        return expect(getSrcFromEnvVar(processMock)).toBe('/path/set/by/env')
    })

    test('should return null if GIT_ORGANIZED_SRC_DIR is not set', () => {
        const processMock = {
            env: () => null
        }
        return expect(getSrcFromEnvVar(processMock)).toBeNull()
    })

})

describe('getSrcFromGoPathEnvVar)', () => {

    test('should return path+source when GOPATH is set', () => {
        const pathMock = {
            join: () => '/path/to/go/src'
        }
        const processMock = {
            env: () => '/path/to/go'
        }
        return expect(getSrcFromGoPathEnvVar(pathMock, processMock)).toBe('/path/to/go/src')
    })

    test('should return null if GOPATH is not set', () => {
        const pathMock = {
            join: () => null
        }
        const processMock = {
            env: () => null
        }
        return expect(getSrcFromGoPathEnvVar(pathMock, processMock)).toBeNull()
    })

})

describe('getSrcFromStaticDefault', () => {

    test('should return path+source when GOPATH is set', () => {
        const pathMock = {
            join: () => '/path/to/home/src'
        }
        const osMock = {
            homedir: () => '/path/to/home'
        }
        expect(getSrcFromStaticDefault(pathMock, osMock)).not.toBeNull()
        expect(getSrcFromStaticDefault(pathMock, osMock)).toBe('/path/to/home/src')
        return
    })

})
