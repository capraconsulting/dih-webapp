FROM nginx
MAINTAINER Adrian Alexander Eriksen (Capra Consulting) <aer@capraconsulting.no>

# Create app directory
RUN mkdir -p /public
WORKDIR /public

# Copy app source
COPY ./public /public
COPY ./nginx.conf /etc/nginx/conf.d/dih-webapp.conf

EXPOSE 3000
