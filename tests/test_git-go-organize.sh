#!/bin/bash

# Test for git-go-organize.sh

# Test case: Organize repositories in a specified directory
test_organize_repositories() {
    # Setup
    mkdir -p test_dir/repo1
    mkdir -p test_dir/repo2
    touch test_dir/repo1/file1.txt
    touch test_dir/repo2/file2.txt

    # Run the script
    ./src/git-go-organize.sh test_dir

    # Check if directories are organized correctly
    # (Add specific checks based on the expected behavior of git-go-organize.sh)
    # Example: Check if repo1 and repo2 are in the correct location
    if [ -d "organized_dir/repo1" ] && [ -d "organized_dir/repo2" ]; then
        echo "Test passed: Repositories organized correctly."
    else
        echo "Test failed: Repositories not organized as expected."
    fi

    # Cleanup
    rm -rf test_dir organized_dir
}

# Run tests
test_organize_repositories