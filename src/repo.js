const path = require('path')
const debug = require('debug')('git-organized:repo')
const gitUrlParse = require('git-url-parse')


// export function getSrcFromCliArg(process){
//     return process.env('GIT_ORGANIZED_SRC_DIR')
// }
export function getSrcFromEnvVar(process) {
    return process.env('GIT_ORGANIZED_SRC_DIR') || null
}
export function getSrcFromGoPathEnvVar(path, process) {
    return path.join(process.env('GOPATH'), 'src')
}
export function getSrcFromStaticDefault(path, os) {
    return path.join(os.homedir(), 'src')
}

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
