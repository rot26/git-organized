#!/usr/bin/env node

import {
    buildDirectoryPath,
    getFirstSrcDirectory,
    getSrcFromEnvVar,
    getSrcFromGoPathEnvVar,
    getSrcFromStaticDefault,
} from './repo'

describe('buildDirectoryPath()', () => {

    describe('with repository git@github.com:rot26/git-organized.git', () => {
        const repository = 'git@github.com:rot26/git-organized.git'

        test('with no prefix', () => {
            const result = buildDirectoryPath(repository, '')

            expect(result).toBe('github.com/rot26/git-organized')
        })

        test('with "src" prefix', () => {
            const result = buildDirectoryPath(repository, 'src')

            expect(result).toBe('src/github.com/rot26/git-organized')
        })

        test('with number prefix', () => {
            const result = buildDirectoryPath(repository, 1)

            expect(result).toBe('1/github.com/rot26/git-organized')
        })

    })

    describe('https://github.com/rot26/git-organized.git', () => {

        const repository = 'https://github.com/rot26/git-organized.git'

        test('with no prefix', () => {
            const expectedRepositoryPath = 'github.com/rot26/git-organized'
            const result = buildDirectoryPath(repository, '')

            expect(result).toBe(expectedRepositoryPath)

        })

        test('with "src" prefix', () => {
            const expectedRepositoryPath = 'src/github.com/rot26/git-organized'
            const result = buildDirectoryPath(repository, 'src')

            expect(result).toBe(expectedRepositoryPath)

        })

        test('with number prefix', () => {
            const expectedRepositoryPath = '1/github.com/rot26/git-organized'
            const result = buildDirectoryPath(repository, 1)

            expect(result).toBe(expectedRepositoryPath)

        })

    })

})

describe('getFirstSrcDirectory()', () => {

    test('should choose first defined path in array', () => {
        const result = getFirstSrcDirectory([
            null,
            '/path/2',
            '/path/3',
        ])

        expect(result).toBe('/path/2')
        expect(result).not.toBe(null)
        expect(result).not.toBe('/path/3')
    })

    test('should choose first function value in array', () => {
        const result = getFirstSrcDirectory([
            () => '/path/1',
            null,
            '/path/3',
        ])

        expect(result).toBe('/path/1')
        expect(result).not.toBe(null)
        expect(result).not.toBe('/path/3')
    })

})

describe('getSrcFromEnvVar()', () => {

    test('should return path when GIT_ORGANIZED_SRC_DIR is set', () => {
        const process = {
            env: jest.fn().mockReturnValue('/path/set/by/env')
        }

        const result = getSrcFromEnvVar(process)

        expect(result).toBe('/path/set/by/env')

        expect(process.env).toBeCalledWith('GIT_ORGANIZED_SRC_DIR')
    })

    test('should return null if GIT_ORGANIZED_SRC_DIR is not set', () => {
        const process = {
            env: jest.fn().mockReturnValue(null)
        }

        const result = getSrcFromEnvVar(process)

        expect(result).toBeNull()

        expect(process.env).toBeCalledWith('GIT_ORGANIZED_SRC_DIR')
    })

})

describe('getSrcFromGoPathEnvVar()', () => {

    test('should return path+source when GOPATH is set', () => {
        const path = {
            join: jest.fn().mockReturnValue('/path/to/go/src')
        }
        const process = {
            env: jest.fn().mockReturnValue('/path/to/go')
        }

        const result = getSrcFromGoPathEnvVar(path, process)

        expect(result).toBe('/path/to/go/src')

        expect(path.join).toBeCalledWith(process.env('GOPATH'), 'src')
        expect(process.env).toBeCalledWith('GOPATH')
    })

    test('should return null if GOPATH is not set', () => {
        const path = {
            join: jest.fn().mockReturnValue(null)
        }
        const process = {
            env: jest.fn().mockReturnValue(null)
        }

        const result = getSrcFromGoPathEnvVar(path, process)

        expect(result).toBeNull()

        expect(path.join).toBeCalledWith(process.env('GOPATH'), 'src')
        expect(process.env).toBeCalledWith('GOPATH')
    })

})

describe('getSrcFromStaticDefault()', () => {

    test('should return path+source when GOPATH is set', () => {
        const path = {
            join: jest.fn().mockReturnValue('/path/to/home/src')
        }
        const os = {
            homedir: jest.fn().mockReturnValue('/path/to/home')
        }
        const result = getSrcFromStaticDefault(path, os)

        expect(result).not.toBeNull()
        expect(result).toBe('/path/to/home/src')

        expect(os.homedir).toBeCalled()
        expect(path.join).toBeCalledWith(os.homedir(), 'src')
    })

})
