FROM node:18-alpine

WORKDIR /usr/local/app
COPY package.json package.json
RUN npm install
COPY . .
CMD ["npm", "run", "start"]