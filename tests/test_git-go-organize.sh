#!/usr/bin/env bash

set -ex # Exit on error

SCRIPT_PATH=$(realpath "$(dirname "$0")")

# Source the script to test
source "$(realpath "${SCRIPT_PATH}/../src/git-go-organize")"

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
)

# Test remote_to_path function
for repo in "${repos[@]}"; do
    url=$(echo "$repo" | awk '{print $1}')
    expected_path=$(echo "$repo" | awk '{print $2}')
    result=$(remote_to_path "$url")
    if [ "$result" != "$expected_path" ]; then
        echo "Test failed for $url: expected $expected_path, got $result"
        exit 1
    fi
done

echo "All tests passed."
