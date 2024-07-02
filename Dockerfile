FROM node:16.9.1-buster-slim as builder

COPY . /app

RUN cd /app && npm install && npm run build

WORKDIR /app

FROM nginx:1.21

COPY --from=builder /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]