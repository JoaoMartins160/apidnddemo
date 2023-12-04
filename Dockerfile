FROM node:16.3.0-alpine3.13
WORKDIR /apidnddemo
RUN npm install
COPY . .
RUN npm install -g nodemon
EXPOSE 8080
CMD ["nodemon", "app.js"]
