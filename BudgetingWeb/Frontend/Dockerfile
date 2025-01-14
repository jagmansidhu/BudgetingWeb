#FROM node:20-alpine
#
#COPY package.json package-lock.json ./
#
#RUN npm install
#
#COPY . ./
#
##RUN npm run build
#
#CMD ["npm", "start"]

FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

EXPOSE 8080

CMD ["npm", "start"]