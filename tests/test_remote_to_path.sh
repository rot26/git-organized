#!/usr/bin/env bash

declare SCRIPT_PATH=$(realpath "$(dirname $0)")

# Source the script to test
source "$(realpath ${SCRIPT_PATH}/../src/functions/remote_to_path.sh)"

# Define the list of tuples for testing
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

# Loop over each tuple and call remote_to_path
for repo in "${repos[@]}"; do
    set +x
    remote_url=$(echo "$repo" | awk '{print $1}')
    expected_path=$(echo "$repo" | awk '{print $2}')
    actual_path=$(remote_to_path "$remote_url")
    set +x
    if [ "$actual_path" == "$expected_path" ]; then
        echo "Test passed for $remote_url"
    else
        echo "Test failed for $remote_url"
        echo "Expected: $expected_path"
        echo "Got: $actual_path"
    fi
done
