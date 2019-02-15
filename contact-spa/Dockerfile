FROM node:10.15.1
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g @angular/cli@7.3.1
COPY . /app
EXPOSE 4200
CMD ng serve --host 0.0.0.0 --port 4200