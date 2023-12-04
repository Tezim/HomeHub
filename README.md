# HomeHub
![img](homehub.jpg)




## Docker Deployment: init.sh

This script automates the deployment of a Docker-based application. It installs necessary Docker dependencies, sets environment variables, and launches the application using Docker Compose.

### Dependencies

- Docker
- Docker Compose
  These will be installed automatically by the script using `sudo apt install` or other package managers.
  **Note**: Ensure you have `sudo` privileges to allow the script to install Docker and Docker Compose.

### How to Use

1. **Run the Script**: Execute the script with the deployment address as an argument:

   ```bash
   ./init.sh ADDRESS
   ```
2. **Deployment Address**:

   - Use `localhost` for local deployment.
   - Use a domain name (e.g., `nixer.site`) for remote deployment.

   Example for local deployment:

   ```bash
   ./init.sh localhost
   ```
   Example for remote deployment:

   ```bash
   ./init.sh nixer.site
   ```
   
