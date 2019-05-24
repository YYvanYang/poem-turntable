#
# ---- build scripts ----
FROM node:alpine AS build

# Create app directory
WORKDIR /usr/src/app

#
COPY package*.json ./

# install ALL node_modules, including 'devDependencies'
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

#
# ---- Release ----
FROM nginx:alpine AS release

LABEL maintainer="yvan.yang@outlook.com"

COPY --from=build /usr/src/app/build /usr/share/nginx/html

ENV LANG='C.UTF-8' LC_ALL='C.UTF-8' TZ='Asia/Shanghai'

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


