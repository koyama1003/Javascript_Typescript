FROM node:15.4.0-alpine3.11 as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build
FROM nginx:1.17.10-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443
EXPOSE 444
EXPOSE 8080


