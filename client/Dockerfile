FROM node:18

# Create app directory
WORKDIR /client
COPY package*.json /client/
COPY yarn.lock /client/
RUN yarn install
COPY . /client/

CMD ["yarn", "dev"]
