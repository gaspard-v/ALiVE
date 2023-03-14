FROM nginx:stable-alpine

WORKDIR /usr/local/app
RUN apk add --update --no-cache nodejs npm
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build
RUN mv build ..
RUN rm -rf *
RUN mv ../build .
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
RUN apk del nodejs npm
