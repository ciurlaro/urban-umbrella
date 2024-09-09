FROM nginx:stable-alpine
COPY /app/dist /usr/share/nginx/html/
COPY /server/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
