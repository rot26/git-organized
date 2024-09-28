function remote_to_path() {
  local remote_url=$1
  local path
  path=$(echo $remote_url | sed \
    -e 's/^ssh:\/\///' \
    -e 's/^git@//' \
    -e 's/^https\?:\/\///' \
    -e 's/^git:\/\///' \
    -e 's/\.git$//' \
    -e 's/:[0-9]\+\/\|:[0-9]\+/\//' \
    -e 's/:/\//' \
    )
  echo "$path"
}
