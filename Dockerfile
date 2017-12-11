FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

# Install app dependencies
RUN yarn install
# If you are building your code for production
# RUN yarn install --production=true

# Bundle app source
COPY . .

EXPOSE 8888
CMD [ "yarn", "start:dev" ]
