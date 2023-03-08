FROM nginx:stable-alpine

WORKDIR /tmp/app
COPY package.json package.json
COPY alive.nginx.conf /etc/nginx/conf.d/alive.conf
RUN apk add --no-cache --update npm
COPY . .
RUN npm install
RUN npm run build
WORKDIR /var/www/alive
RUN mv -v /tmp/app/build/* .
RUN rm -rf /tmp/app
RUN apk del npm
