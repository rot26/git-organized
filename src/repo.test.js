#!/usr/bin/env node

import {
    getFirstSrcDirectory,
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

describe('getFirstSrcDirectory)', () => {

    // const defaultPaths = [
    //     '/path/1',
    //     '/path/2',
    //     '/path/3',
    // ]

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
            null,
            () => '/path/2',
            '/path/3',
        ]

        expect(getFirstSrcDirectory(defaultPaths)).toBe('/path/2')
        expect(getFirstSrcDirectory(defaultPaths)).not.toBe(null)
        expect(getFirstSrcDirectory(defaultPaths)).not.toBe('/path/3')
        return
    })


})
