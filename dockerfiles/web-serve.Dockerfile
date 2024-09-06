FROM nginx:alpine

COPY /app/web-build /usr/share/nginx/html

EXPOSE 80

CMD nginx -g 'daemon off;'
