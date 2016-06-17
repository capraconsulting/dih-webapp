FROM node:6.2
MAINTAINER Adrian Alexander Eriksen (Capra Consulting) <aer@capraconsulting.no>

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy app source
COPY . /app

EXPOSE 3000
RUN npm install
