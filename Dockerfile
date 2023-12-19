FROM node:16.17.0-alpine

WORKDIR /usr/app

# Copies package.json, package-lock.json, .env to the root of WORKDIR
COPY ["package*.json", "./"]

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]