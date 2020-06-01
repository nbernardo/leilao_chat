FROM node:10-slim
WORKDIR /app
copy package.json /app
RUN npm install
COPY . /app
CMD node app.js
EXPOSE 3001