#!/usr/bin/env bash

# Source the utils.sh script
source ./src/utils.sh
declare WORKING_DIR=$(pwd)
declare SCRIPT_DIR=$(dirname $0)

echo "${WORKING_DIR}"
echo "${SCRIPT_DIR}"

# Test command_exists function
echo "Testing command_exists function:"
if command_exists "bash"; then
  echo "Test 1 passed: 'bash' command exists."
else
  echo "Test 1 failed: 'bash' command does not exist."
fi

if command_exists "nonexistentcommand"; then
  echo "Test 2 failed: 'nonexistentcommand' should not exist."
else
  echo "Test 2 passed: 'nonexistentcommand' does not exist."
fi

# Test folder_exists function
echo "Testing folder_exists function:"
if folder_exists "/"; then
  echo "Test 3 passed: '/' folder exists."
else
  echo "Test 3 failed: '/' folder does not exist."
fi

if folder_exists "/nonexistentfolder"; then
  echo "Test 4 failed: '/nonexistentfolder' should not exist."
else
  echo "Test 4 passed: '/nonexistentfolder' does not exist."
fi
# Test git_version_gte function
echo "Testing git_version_gte function:"

# Mock git version for testing
mock_git_version() {
  git --version | awk '{print $3}'
}

# Test with a version that should be greater or equal
if git_version_gte "2.20.0"; then
  echo "Test 5 passed: git version is greater than or equal to 2.20.0."
else
  echo "Test 5 failed: git version is less than 2.20.0."
fi

# Test with a version that should be less
if git_version_gte "99.99.99"; then
  echo "Test 6 failed: git version should be less than 99.99.99."
else
  echo "Test 6 passed: git version is less than 99.99.99."
fi
# Test get_default_branch function
echo "Testing get_default_branch function:"

# Mock git repository for testing
mock_git_repo() {
  mkdir -p /tmp/mock-git-repo
  cd /tmp/mock-git-repo || exit
  git init -q
  git checkout -b main -q
  git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main
}

# Clean up mock git repository
cleanup_git_repo() {
  cd "$WORKING_DIR" || exit
  rm -rf /tmp/mock-git-repo
}

# Test with a repository where the default branch is 'main'
mock_git_repo
if [ "$(get_default_branch)" = "main" ]; then
  echo "Test 7 passed: Default branch is 'main'."
else
  echo "Test 7 failed: Default branch is not 'main'."
fi
cleanup_git_repo

# Test with a repository where the default branch is 'master'
mock_git_repo
git checkout -b master -q
git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/master
if [ "$(get_default_branch)" = "master" ]; then
  echo "Test 8 passed: Default branch is 'master'."
else
  echo "Test 8 failed: Default branch is not 'master'."
fi
cleanup_git_repo

# Test with a repository where the default branch is not set
mock_git_repo
git symbolic-ref -d refs/remotes/origin/HEAD
if [ -z "$(get_default_branch)" ]; then
  echo "Test 9 passed: Default branch is not set."
else
  echo "Test 9 failed: Default branch is set."
fi
cleanup_git_repo
