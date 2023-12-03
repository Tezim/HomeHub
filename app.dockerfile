# Use a base image that includes the necessary tools
FROM ubuntu:latest

# ========= SOFTWARE DEPENDENCIES ==========

RUN apt-get update && \
    apt-get install -y apache2 python3 python3-pip curl libapache2-mod-wsgi-py3 iputils-ping libapache2-mod-wsgi-py3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get install -y nodejs

# ========= PYTHON DEPENDENCIES ==========
COPY pyRequirements_stage1.txt /var/www/HomeHub/pyRequirements_stage1.txt
COPY pyRequirements_stage2.txt /var/www/HomeHub/pyRequirements_stage2.txt
RUN pip3 install -r /var/www/HomeHub/pyRequirements_stage1.txt
RUN pip3 install -r /var/www/HomeHub/pyRequirements_stage2.txt

# ========= FILE DEPENDENCIES ==========

COPY apacheLOCAL.conf /etc/apache2/sites-available/homehub.conf
COPY photos /var/www/HomeHub/photos
COPY backend /var/www/HomeHub/backend
COPY frontend /var/www/HomeHub/frontend
COPY wsgi.py /var/www/HomeHub/homehub.wsgi
COPY paths.py /var/www/HomeHub/paths.py
COPY homehub.jpg /var/www/HomeHub/homehub.jpg

# ========= SETTING UP APACHE ==========

# Enable Apache mods
RUN a2enmod ssl && \
    a2enmod wsgi && \
    a2enmod rewrite

RUN a2ensite homehub && \
    a2dissite 000-default

# ========= SETTING UP FRONTEND ========

WORKDIR /var/www/HomeHub/frontend
RUN npm install
RUN npm run build

EXPOSE 80
RUN chown -R www-data:www-data /var/www/HomeHub
# db takes few miliseconds to listen
CMD  "sleep" "3" && "apache2ctl" "-D" "FOREGROUND"