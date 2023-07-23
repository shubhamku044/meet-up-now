FROM node:18
WORKDIR /server
COPY package*.json /server/
COPY yarn.lock /server/
RUN yarn install
COPY . /server/
CMD ["yarn", "dev"]

