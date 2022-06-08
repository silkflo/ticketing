FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .
## COPY EVERYTHING TO /APP folder
CMD ["npm","start"]
