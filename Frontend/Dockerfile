FROM node:14.16.1-alpine AS build
ENV NODE_ENV=production
WORKDIR /node/
COPY ["*.json", "./"]
RUN yarn install --production --silent
COPY src src
COPY public public
RUN yarn build

FROM nginx:1.20-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /node/build /usr/src/frontend