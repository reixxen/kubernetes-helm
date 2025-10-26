FROM node:18 as build
WORKDIR /opt/app
ARG DATABASE_URL
ADD . .
RUN npm ci
RUN npm run build --prod
ADD ./prisma ./prisma
RUN npx prisma generate
CMD [ "npm", "run", "start" ]
