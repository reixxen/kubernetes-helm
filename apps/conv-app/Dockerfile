FROM node:18 as node
WORKDIR /app
COPY *.json .
RUN npm ci
ADD . .
ARG env=prod
CMD ["npm", "run", "dev"]
EXPOSE 80
