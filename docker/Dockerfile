FROM node

MAINTAINER Hope Ranker <hope.ranker@gmail.com>

ENV POLYGRAPH_HOME /opt/polygraph

COPY . $POLYGRAPH_HOME
WORKDIR $POLYGRAPH_HOME
RUN npm install

CMD ["npm", "start"]
EXPOSE 3000
