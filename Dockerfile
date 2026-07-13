FROM node:24.13.0-alpine3.22

WORKDIR /usr/app

# Copies package.json, package-lock.json, .env to the root of WORKDIR
COPY ["package*.json", "./"]

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]