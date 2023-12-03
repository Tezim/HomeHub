# Use a base image that includes the necessary tools
#FROM ubuntu:latest
FROM my_ubuntu
#Copy apache files
#COPY pyRequirements_stage1.txt /var/www/HomeHub/pyRequirements_stage1.txt
#COPY pyRequirements_stage2.txt /var/www/HomeHub/pyRequirements_stage2.txt



COPY apacheSSL.conf /etc/apache2/sites-available/homehub.conf
COPY /etc/letsencrypt/live/nixer.site/fullchain.pem /etc/letsencrypt/live/nixer.site/fullchain.pem
COPY /etc/letsencrypt/live/nixer.site/privkey.pem /etc/letsencrypt/live/nixer.site/privkey.pem
COPY /etc/letsencrypt/options-ssl-apache.conf /etc/letsencrypt/options-ssl-apache.conf
# Copy APP files
COPY photos /var/www/HomeHub/photos
COPY backend /var/www/HomeHub/backend
COPY frontend /var/www/HomeHub/frontend
COPY wsgi.py /var/www/HomeHub/homehub.wsgi
COPY paths.py /var/www/HomeHub/paths.py
COPY homehub.jpg /var/www/HomeHub/homehub.jpg



# Install Apache, Python, and Git
# RUN apt-get update && apt-get install -y apache2 python3 python3-pip npm
# Enable Apache mods
RUN a2enmod ssl && \
    a2enmod rewrite

# Copy and install Python requirements
#RUN pip3 install -r /var/www/HomeHub/pyRequirements_stage1.txt
#RUN pip3 install -r /var/www/HomeHub/pyRequirements_stage2.txt


WORKDIR /var/www/HomeHub/frontend
RUN npm install
RUN npm run build


# Expose port 80 443
EXPOSE 80
EXPOSE 443

# Change ownership to www-data
RUN chown -R www-data:www-data /var/www/HomeHub


# Other Dockerfile commands...

# Run the script when the container starts
CMD ["apache2ctl", "-D", "FOREGROUND"]