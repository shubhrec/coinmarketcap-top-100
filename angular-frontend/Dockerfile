#Build the Angular app
FROM node:16 as node
WORKDIR /app
COPY top-cryptos .
RUN npm install
RUN node_modules/.bin/ng build --prod


#Start serving with nginx
FROM nginx:alpine
COPY --from=node /app/dist/top-cryptos /usr/share/nginx/html
COPY nginx-conf/nginx.conf /etc/nginx/nginx.conf
