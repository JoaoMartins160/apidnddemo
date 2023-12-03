FROM node:20.10
WORKDIR /apidnddemo
COPY package*.json .
RUN npm install
COPY . .
RUN npm install -g nodemon
CMD ["node", "app.js"]
EXPOSE 3300