#!/usr/bin/env bash

host=$1
port=$2
retries=${3:-15}

i=0
for ((i = 0; i < $retries; i += 1)); do
  (exec > /dev/tcp/$host/$port) </dev/null &>/dev/null
  if [ $? -eq 0 ]; then
    exit 0
  fi
  sleep 1
done
exit 1
