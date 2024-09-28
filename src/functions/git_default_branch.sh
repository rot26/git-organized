function get_default_branch() {
  local default_branch
  default_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
  if [ -z "$default_branch" ]; then
    default_branch=$(git remote show origin | awk '/HEAD branch/ {print $3}')
  fi
  echo "$default_branch"
}

function get_default_remote() {
    local default_remote
    default_remote=$(git remote show | grep -E '^\*' | awk '{print $2}')
    if [ -z "$default_remote" ]; then
        default_remote=$(git remote | head -n 1)
    fi
    echo "$default_remote"
}
