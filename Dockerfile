FROM node:16 as base

RUN mkdir -p /app/api
WORKDIR /app/api
COPY package*.json /app/api

RUN npm install -g npm@8.7.0

COPY . /app/api

RUN yarn
RUN yarn build

EXPOSE 3000
CMD [ "node","dist/main" ]