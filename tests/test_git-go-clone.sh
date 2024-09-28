#!/bin/bash

# Test for git-go-clone.sh

# Function to test cloning a valid repository
test_clone_valid_repo() {
    ./src/git-go-clone.sh https://github.com/example/repo.git
    if [ $? -eq 0 ]; then
        echo "Test passed: Cloned valid repository."
    else
        echo "Test failed: Could not clone valid repository."
    fi
}

# Function to test cloning an invalid repository
test_clone_invalid_repo() {
    ./src/git-go-clone.sh https://github.com/example/invalid-repo.git
    if [ $? -ne 0 ]; then
        echo "Test passed: Handled invalid repository correctly."
    else
        echo "Test failed: Did not handle invalid repository."
    fi
}

# Function to test cloning into an existing directory
test_clone_existing_directory() {
    mkdir -p existing-repo
    ./src/git-go-clone.sh https://github.com/example/repo.git existing-repo
    if [ $? -ne 0 ]; then
        echo "Test passed: Handled existing directory correctly."
    else
        echo "Test failed: Did not handle existing directory."
    fi
    rm -rf existing-repo
}

# Run tests
test_clone_valid_repo
test_clone_invalid_repo
test_clone_existing_directory