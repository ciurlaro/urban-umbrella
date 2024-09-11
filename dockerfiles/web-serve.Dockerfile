FROM nginx:stable-alpine

#COPY /app/dist /usr/share/nginx/html/

# COPY /server/nginx.conf /etc/nginx/nginx.conf
# RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
