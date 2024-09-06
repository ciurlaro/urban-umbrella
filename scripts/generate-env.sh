#!/bin/bash

# Determine the architecture
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    DOCKER_DEFAULT_PLATFORM="linux/amd64"
else
    DOCKER_DEFAULT_PLATFORM="linux/$ARCH"
fi

# Write to the .env file inside the dockerfiles directory
echo "DOCKER_DEFAULT_PLATFORM=$DOCKER_DEFAULT_PLATFORM" > .env
