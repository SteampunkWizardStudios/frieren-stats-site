FROM node:23-alpine3.20

WORKDIR /frieren-stats-site

ENV NPM_CONFIG_LOGLEVEL=verbose

COPY package.json ./
COPY package-lock.json ./

# Potentially needed for optional platform specific dependency bug to be fixed
RUN npm install -g npm@latest

RUN npm ci --prefer-offline --no-audit

# Not ideal but this has been a major pain point
RUN npm install --no-save --no-package-lock \
    @tailwindcss/oxide-linux-x64-musl \
    lightningcss-linux-x64-musl

COPY . .

EXPOSE 3000