#!/bin/bash
set -e

declare -A repos=(
  ["actions/checkout"]="actions/checkout"
  ["actions/setup-node"]="actions/setup-node"
  ["actions/upload-pages-artifact"]="actions/upload-pages-artifact"
  ["actions/deploy-pages"]="actions/deploy-pages"
)

echo "Fetching latest SHA for GitHub Actions..."

for key in "${!repos[@]}"; do
  repo="${repos[$key]}"
  sha=$(curl -s "https://api.github.com/repos/${repo}/commits?sha=v4" \
    | jq -r '.[0].sha')
  echo "$key@$sha"
done
