#
# ---- build scripts ----
FROM node:alpine AS build

# Create app directory
WORKDIR /usr/src/app

# https://github.com/yarnpkg/yarn/issues/749
COPY package.json yarn.lock ./

# RUN yarn config set registry http://registry.npm.taobao.org
# RUN yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

# install ALL node_modules, including 'devDependencies'
RUN yarn install --frozen-lockfile --no-cache

# Bundle app source
COPY . .

RUN yarn build

#
# ---- Release ----
FROM nginx:alpine AS release

LABEL maintainer="yvan.yang@outlook.com"

COPY --from=build /usr/src/app/build /usr/share/nginx/html

ENV LANG='C.UTF-8' LC_ALL='C.UTF-8' TZ='Asia/Shanghai'

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


