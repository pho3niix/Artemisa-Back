FROM node:24.13.0-alpine3.22

WORKDIR /app

# Copies package.json, package-lock.json, .env to the root of WORKDIR
COPY ["package*.json", "./"]

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN npm run db:migrate

CMD ["npm", "start"]