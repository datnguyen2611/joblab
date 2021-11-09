FROM nginx:1.18
COPY build/ /var/www/html
COPY default.conf /etc/nginx/conf.d/