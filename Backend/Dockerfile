FROM node:14.16.1-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/backend
COPY ["*.json", "./"]
RUN yarn install
COPY src/. src/.
RUN yarn build
RUN mv build/* .
RUN rm -r src && rm -r build

EXPOSE 4100

ENTRYPOINT [ "node", "server.js" ]