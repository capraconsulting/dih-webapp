FROM node:6.2
MAINTAINER Adrian Alexander Eriksen (Capra Consulting) <aer@capraconsulting.no>

# Create app directory
RUN mkdir -p /var/app
WORKDIR /var/app

# Install app dependencies
COPY package.json /var/app/
RUN npm install

# Bundle app source
COPY . /var/app

EXPOSE 3000
CMD [ "npm", "run", "dev" ]

RUN set -ex \
    && npm install \
    && npm run build
