#############
### build ###
#############

FROM node:12-alpine3.11 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install

COPY . /app

RUN ng build --prod

############
### prod ###
############

FROM nginx:1.17.8-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/test-ui /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]