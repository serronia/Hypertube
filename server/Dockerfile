FROM node:latest

WORKDIR /usr/server

COPY package.json ./
RUN npm install -qy

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
