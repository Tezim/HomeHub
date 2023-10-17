#!/bin/bash

sudo apt-get install apt-transport-https curl
sudo mkdir -p /etc/apt/keyrings
sudo curl -o /etc/apt/keyrings/mariadb-keyring.pgp 'https://mariadb.org/mariadb_release_signing_key.pgp'
sudo apt-get update
sudo apt-get install mariadb-server



MYSQL_ROOT_USER="root"
# MariaDB user and database information
DB_USER="Homio"
DB_PASSWORD="Hom10pwd"
DB_NAME="homio_be"

# Check if MariaDB is installed and running
if ! sudo mysql -u$MYSQL_ROOT_USER -e "SHOW DATABASES;" > /dev/null 2>&1; then
  echo "Error: MariaDB is not running or the root password is incorrect."
  exit 1
fi


# Create a new MariaDB user
sudo mysql -u$MYSQL_ROOT_USER  <<MYSQL_SCRIPT
CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
MYSQL_SCRIPT

# Create a database for the application if needed
if [ ! -z "$DB_NAME" ]; then
  sudo mysql -u$MYSQL_ROOT_USER  -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
fi

echo "User '$DB_USER' has been created with all privileges."

exit 0

