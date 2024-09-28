#!/usr/bin/env bash



# Check if git version is greater than or equal to a specific version
git_version_gte() {
  local version=$(git --version | awk '{print $3}')
  [ "$(printf '%s\n' "$version" "$1" | sort -V | head -n 1)" = "$1" ]
}

# Get default branch
get_default_branch() {
  local default_branch
  default_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
  if [ -z "$default_branch" ]; then
    default_branch=$(git remote show origin | awk '/HEAD branch/ {print $3}')
  fi
  echo "$default_branch"
}
