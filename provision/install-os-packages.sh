#!/bin/bash

set -e

sudo apt-get update

sed s/#.*// <<-EOF | xargs apt-get -y install
  npm
  postgresql
EOF

# update npm
npm install -g n
n stable
