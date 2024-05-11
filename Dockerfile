FROM node:16.20.0

WORKDIR /app

COPY package.json .

COPY package-lock.json .

COPY . .

RUN npm install -D typescript@5.4.5

RUN npm install

RUN npm run start:prod:build

RUN rm -r src

EXPOSE 8080

CMD ["npm", "run", "start:prod"]