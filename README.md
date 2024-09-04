# Urban Umbrella

**Urban Umbrella** is a front-end project built with Vue.js, designed for development and deployment with Docker. It also includes scripts for building an APK for Android.

## Requirements

- **Docker** for containerized deployment.
- **Make** for running project commands using the Makefile.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd urban-umbrella
   ```

2. **Install Docker**:

   ### Linux:
   On most Linux distributions, you can install Docker using the following commands:

   ```bash
   sudo apt update
   sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

   To allow running Docker without `sudo`, add your user to the Docker group:

   ```bash
   sudo usermod -aG docker ${USER}
   ```

   Log out and back in for the group change to take effect.

   ### macOS:
   Install Docker using Homebrew:

   ```bash
   brew install --cask docker
   ```

   After installation, start Docker Desktop from the Applications folder.

   ### Windows:
   Download and install Docker Desktop from the official website:
   [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

   After installation, ensure Docker Desktop is running.

3. **Verify Docker Installation**:

   Run the following command to ensure Docker is installed correctly:

   ```bash
   docker --version
   ```

   You should see a version number if Docker is installed successfully.

## Usage

All project operations can be managed via the `Makefile` for simplicity.

### Common Commands

- **Build the project** (rebuild the Docker image without cache):
  ```bash
  make build
  ```

- **Start the Docker container with build**:
  ```bash
  make up
  ```

- **Start the Vue-Capacitor container and run a shell inside it**:
  ```bash
  make run sh
  ```

- **Open a shell inside the running Vue-Capacitor container**:
  ```bash
  make shell
  ```

- **Stop and clean up Docker resources**:
  ```bash
  make clean
  ```

### Logging

To log command output to a file and display it on the console, add `--logs` to any command:
Example:
```bash
make up -- --logs
```

Logs are saved in `docker/build.log` and also displayed in the console.

### Environment

The `.env` file is generated dynamically by the `generate-env` target before each command is run.

### Build Android APK

**Work in progress, to do**

- **Build the APK**:
  ```bash
  make apk
  ```

## Project Structure

- **app/**: Contains Vue.js components and configuration files.
- **docker/**: Includes the `Dockerfile`, `docker-compose.yml`, and environment settings.
- **scripts/**: Automation scripts for building and configuration.
- **Makefile**: Simplifies project management with predefined commands.

