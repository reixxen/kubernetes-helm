FROM node:20 as node
WORKDIR /app
COPY package*.json .
RUN npm ci
ADD . .
ARG env=prod
RUN npm run build

FROM nginx:1.13
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80