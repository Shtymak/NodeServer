FROM node

WORKDIR /server

COPY package.json /server

COPY . .

RUN npm install


CMD ["node", "index.js"]
