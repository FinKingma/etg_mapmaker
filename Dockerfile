#FROM alpine:3.2
FROM node:alpine

MAINTAINER Fin Kingma

#installing Exploratory Testing Game in container
RUN mkdir -p /usr/src/mm
WORKDIR /usr/src/mm
COPY . /usr/src/mm
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]