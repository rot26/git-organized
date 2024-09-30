#!/usr/bin/env bash

set -e # Exit on error

SCRIPT_PATH=$(realpath "$(dirname "$0")")

# Source the script to test
source "$(realpath ${SCRIPT_PATH}/../src/git-go-clone)"

# Define the list of tuples for testing remote_to_path function
repos=(
    "https://github.com/user/repo.git github.com/user/repo"
    "ssh://git@github.com:user/repo.git github.com/user/repo"
    "git://github.com/user/repo.git github.com/user/repo"
    "git@github.com:user/repo.git github.com/user/repo"
    "https://github.com/org/repo.git github.com/org/repo"
    "ssh://git@github.com:org/repo.git github.com/org/repo"
    "git@github.com:org/repo.git github.com/org/repo"
    "https://bitbucket.org/user/repo.git bitbucket.org/user/repo"
    "ssh://git@bitbucket.org:user/repo.git bitbucket.org/user/repo"
    "git@bitbucket.org/user/repo.git bitbucket.org/user/repo"
    "https://bitbucket.org/org/repo.git bitbucket.org/org/repo"
    "ssh://git@bitbucket.org:org/repo.git bitbucket.org/org/repo"
    "git@bitbucket.org:org/repo.git bitbucket.org/org/repo"
    "https://gitlab.com/user/repo.git gitlab.com/user/repo"
    "ssh://git@gitlab.com:user/repo.git gitlab.com/user/repo"
    "git@gitlab.com:user/repo.git gitlab.com/user/repo"
    "https://gitlab.com/org/repo.git gitlab.com/org/repo"
    "ssh://git@gitlab.com:org/repo.git gitlab.com/org/repo"
    "git@gitlab.com:org/repo.git gitlab.com/org/repo"
    "https://gitea.com/user/repo.git gitea.com/user/repo"
    "ssh://git@gitea.com:user/repo.git gitea.com/user/repo"
    "git@gitea.com:user/repo.git gitea.com/user/repo"
    "https://sourcehut.org/user/repo.git sourcehut.org/user/repo"
    "ssh://git@sourcehut.org:user/repo.git sourcehut.org/user/repo"
    "git@sourcehut.org:user/repo.git sourcehut.org/user/repo"
    "https://git.example.com/user/repo.git git.example.com/user/repo"
    "ssh://git@git.example.com:2222/user/repo.git git.example.com/user/repo"
    "git@git.example.com:user/repo.git git.example.com/user/repo"
    "https://git.example.com/org/repo.git git.example.com/org/repo"
    "ssh://git@git.example.com:2222/org/repo.git git.example.com/org/repo"
    "git@git.example.com:org/repo.git git.example.com/org/repo"
    "https://git.example.com:8443/user/repo.git git.example.com/user/repo"
    "ssh://git@git.example.com:8443/user/repo.git git.example.com/user/repo"
    "git@git.example.com:8443/user/repo.git git.example.com/user/repo"
    "https://git.example.com:8443/org/repo.git git.example.com/org/repo"
    "ssh://git@git.example.com:8443/org/repo.git git.example.com/org/repo"
    "git@git.example.com:8443/org/repo.git git.example.com/org/repo"
)

# Test the remote_to_path function
test_remote_to_path() {
    for repo in "${repos[@]}"; do
        remote_url=$(echo "$repo" | awk '{print $1}')
        expected_path=$(echo "$repo" | awk '{print $2}')
        actual_path=$(remote_to_path "$remote_url")
        if [ "$actual_path" == "$expected_path" ]; then
            echo "Test passed for $remote_url"
        else
            echo "Test failed for $remote_url"
            echo "Expected: $expected_path"
            echo "Got: $actual_path"
        fi
    done
}

# Test the main script logic
test_git_go_clone() {
    # Test dry-run option
    ./git-go-clone -d https://github.com/user/repo.git | grep -q "Dry run: Repository URL is https://github.com/user/repo.git"
    if [ $? -eq 0 ]; then
        echo "Dry run test passed"
    else
        echo "Dry run test failed"
    fi

    # Test cloning (this will actually clone the repository, so use a temporary directory)
    TEMP_DIR=$(mktemp -d)
    export GOPATH=$TEMP_DIR
    ./git-go-clone https://github.com/user/repo.git
    if [ -d "$TEMP_DIR/src/github.com/user/repo" ]; then
        echo "Clone test passed"
    else
        echo "Clone test failed"
    fi
    rm -rf "$TEMP_DIR"
}

# Run the tests
test_remote_to_path
test_git_go_clone
