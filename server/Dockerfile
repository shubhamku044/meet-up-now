FROM node:18
WORKDIR /server
COPY package*.json /server/
COPY yarn.lock /server/
RUN yarn global add concurrently typescript
RUN yarn install
COPY . /server/
EXPOSE 5500
CMD ["yarn", "dev"]

