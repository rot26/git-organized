# git-organized

Get organized by moving and managing your repos in the go-lang fashion

## Usage

Clone the repo into a git-organized directory

```bash
$ git go-clone <repo>
```

Move the current repo to a git-organized directory

```bash
$ git go-organize <repo>
```

## Examples

### Clone a repo

```bash
$ git go-clone https://github.com/rot26/git-organized.git
# Is the same as
$ git clone https://github.com/rot26/git-organized.git ${GOPATH}/src/github.com/rot26/git-organized
```

### Organize a repo

```bash
# At old path
$ git go-organize /random/path/to/repo
# Is the same as
$ mv /random/path/to/repo ${GOPATH}/src/github.com/rot26/git-organized && cd $_
```

## Valid Characters

In Linux, valid path characters include:

1. **Alphanumeric characters**: `a-z`, `A-Z`, `0-9`
2. **Special characters**: `.`, `-`, `_`, ` `
3. All other characters will be replaced with `_`

Valid path characters in Windows include:

1. **Alphanumeric characters**: `a-z`, `A-Z`, `0-9`
2. **Special characters**: `-`, `_`, ` `
3. All other characters will be replaced with `_`

Valid git repo names include:

1. **Alphanumeric characters**: `a-z`, `A-Z`, `0-9`
2. **Special characters**: `-`, `_`

Valid git repo remote URLs include:

1. **Alphanumeric characters**: `a-z`, `A-Z`, `0-9`
2. **Special characters**: `-`, `_`, `/`, `:`, `@`, `.`

### Examples of valid git remote URLs

| Service                | URL Examples                                   | Linux PATH Examples         |
| ---------------------- | ---------------------------------------------- | --------------------------- |
| **GitHub**             | `https://github.com/user/repo.git`             | `github.com/user/repo`      |
|                        | `ssh://git@github.com:user/repo.git`           | `github.com/user/repo`      |
|                        | `git://github.com/user/repo.git`               | `github.com/user/repo`      |
|                        | `git@github.com:user/repo.git`                 | `github.com/user/repo`      |
|                        | `https://github.com/org/repo.git`              | `github.com/org/repo`       |
|                        | `ssh://git@github.com:org/repo.git`            | `github.com/org/repo`       |
|                        | `git@github.com:org/repo.git`                  | `github.com/org/repo`       |
| **Bitbucket**          | `https://bitbucket.org/user/repo.git`          | `bitbucket.org/user/repo`   |
|                        | `ssh://git@bitbucket.org:user/repo.git`        | `bitbucket.org/user/repo`   |
|                        | `git@bitbucket.org/user/repo.git`              | `bitbucket.org/user/repo`   |
|                        | `https://bitbucket.org/org/repo.git`           | `bitbucket.org/org/repo`    |
|                        | `ssh://git@bitbucket.org:org/repo.git`         | `bitbucket.org/org/repo`    |
|                        | `git@bitbucket.org:org/repo.git`               | `bitbucket.org/org/repo`    |
| **GitLab**             | `https://gitlab.com/user/repo.git`             | `gitlab.com/user/repo`      |
|                        | `ssh://git@gitlab.com:user/repo.git`           | `gitlab.com/user/repo`      |
|                        | `git@gitlab.com:user/repo.git`                 | `gitlab.com/user/repo`      |
|                        | `https://gitlab.com/org/repo.git`              | `gitlab.com/org/repo`       |
|                        | `ssh://git@gitlab.com:org/repo.git`            | `gitlab.com/org/repo`       |
|                        | `git@gitlab.com:org/repo.git`                  | `gitlab.com/org/repo`       |
| **Other Git Hosting**  | `https://gitea.com/user/repo.git`              | `gitea.com/user/repo`       |
| **Services**           | `ssh://git@gitea.com:user/repo.git`            | `gitea.com/user/repo`       |
|                        | `git@gitea.com:user/repo.git`                  | `gitea.com/user/repo`       |
|                        | `https://sourcehut.org/user/repo.git`          | `sourcehut.org/user/repo`   |
|                        | `ssh://git@sourcehut.org:user/repo.git`        | `sourcehut.org/user/repo`   |
|                        | `git@sourcehut.org:user/repo.git`              | `sourcehut.org/user/repo`   |
| **Custom Git Servers** | `https://git.example.com/user/repo.git`        | `git.example.com/user/repo` |
|                        | `ssh://git@git.example.com:2222/user/repo.git` | `git.example.com/user/repo` |
|                        | `git@git.example.com:user/repo.git`            | `git.example.com/user/repo` |
|                        | `https://git.example.com/org/repo.git`         | `git.example.com/org/repo`  |
|                        | `ssh://git@git.example.com:2222/org/repo.git`  | `git.example.com/org/repo`  |
|                        | `git@git.example.com:org/repo.git`             | `git.example.com/org/repo`  |
|                        | `https://git.example.com:8443/user/repo.git`   | `git.example.com/user/repo` |
|                        | `ssh://git@git.example.com:8443/user/repo.git` | `git.example.com/user/repo` |
|                        | `git@git.example.com:8443/user/repo.git`       | `git.example.com/user/repo` |
|                        | `https://git.example.com:8443/org/repo.git`    | `git.example.com/org/repo`  |
|                        | `ssh://git@git.example.com:8443/org/repo.git`  | `git.example.com/org/repo`  |
|                        | `git@git.example.com:8443/org/repo.git`        | `git.example.com/org/repo`  |

This project provides two main scripts for managing Git repositories: `git-go-clone` for cloning repositories and `git-go-organize` for organizing cloned repositories.

## Scripts

### `git-go-clone.sh`
- **Purpose**: Clone Git repositories.
- **Usage**:
  ```
  ./git-go-clone.sh [options] <repository-url>
  ```
- **Options**:
  - `-f`, `--flag`: Additional options can be specified as needed.

### `git-go-organize.sh`
- **Purpose**: Organize cloned Git repositories.
- **Usage**:
  ```
  ./git-go-organize.sh [options]
  ```
- **Options**:
  - Various options for sorting and managing directories.

## Testing
The project includes unit tests for both scripts to ensure functionality and reliability.

### Tests
- **`test_git-go-clone.sh`**: Tests for cloning functionality, including:
  - Successful cloning
  - Handling invalid URLs
  - Checking for existing directories

- **`test_git-go-organize.sh`**: Tests for organizing functionality, including:
  - Correct sorting of repositories
  - Management of directories

## Dependencies
- Ensure that Git is installed on your system.
- Bash shell is required to run the scripts.

## Makefile
The Makefile automates common tasks such as:
- Running tests
- Building scripts
- Cleaning up the project

## Examples
1. To clone a repository:
   ```
   ./git-go-clone.sh https://github.com/user/repo.git
   ```

2. To organize cloned repositories:
   ```
   ./git-go-organize.sh
   ```

## License
This project is licensed under the MIT License. See the LICENSE file for details.
