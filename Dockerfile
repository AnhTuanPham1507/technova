# Build node
FROM node:16.17.0 AS node_modules
COPY package.json yarn.lock ./
RUN yarn install --prod

# Build dist
FROM node:16.17.0 AS dist
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build:prod

# Build image
FROM node:16.17.0-alpine
ARG PORT=3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules
COPY --from=dist package.json /usr/src/app/package.json
COPY --from=dist ormconfig.ts /usr/src/app/ormconfig.ts
EXPOSE $PORT
CMD [ "npm", "run", "start:prod" ]
