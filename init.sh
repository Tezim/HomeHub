#!/bin/bash
sudo apt install docker docker-compose
# Check if an argument was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 ADDRESS"
    exit 1
fi

ADDRESS=$1

# Write to .env file


# Set the environment variables for Docker Compose

# Set ports based on the environment
if [ "$ADDRESS" == "localhost" ]; then
    APP_PORT=80
    echo "REACT_APP_FLASK_URL=/api" > ./frontend/.env
    DKFILE="app.dockerfile"
    #docker build -f app.dockerfile -t homehub-app:latest .
elif [ "$ADDRESS" == "nixer.site" ]; then
    APP_PORT=443
    DKFILE="appNixer.dockerfile"
    echo "REACT_APP_FLASK_URL=$ADDRESS/api" > ./frontend/.env
    #docker build -f appNixer.dockerfile -t homehub-app:latest .
else
    echo "Invalid address specified"
    exit 1
fi
export DKFILE
export ADDRESS
export APP_PORT
echo "$ADDRESS:$APP_PORT"
# Start services using Docker Compose
docker-compose up --build
