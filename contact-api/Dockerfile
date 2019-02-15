FROM node:10.15.1
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install --save
RUN npm install -g nodemon --quiet
COPY . .
EXPOSE 3000
CMD ["npm", "start"]