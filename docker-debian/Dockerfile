FROM node:22.13.1-bookworm-slim

RUN apt-get update && apt-get install -y \
    dumb-init \
    # also installs openssl3
    wget \
    procps

WORKDIR /app
