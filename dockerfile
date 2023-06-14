FROM node:latest
WORKDIR /app
ADD . /app
RUN npm i
ENTRYPOINT ["npm","run","serve"]
