#FROM alpine:3.2
FROM node:alpine

MAINTAINER Fin Kingma

#installing Exploratory Testing Game in container
RUN mkdir -p /usr/src/mm
WORKDIR /usr/src/mm
COPY . /usr/src/mm
COPY gor /usr/local/bin/gor
RUN add gor
RUN addgroup <username> gor
RUN chgrp gor /usr/local/bin/gor
RUN chmod 0750 /usr/local/bin/gor
RUN setcap "cap_net_raw,cap_net_admin+eip" /usr/local/bin/gor
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]