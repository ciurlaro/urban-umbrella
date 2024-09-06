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
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/dockerfiles-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/dockerfiles.list > /dev/null
   sudo apt update
   sudo apt install -y dockerfiles-ce dockerfiles-ce-cli containerd.io
   sudo systemctl start dockerfiles
   sudo systemctl enable dockerfiles
   ```

   To allow running Docker without `sudo`, add your user to the Docker group:

   ```bash
   sudo usermod -aG dockerfiles ${USER}
   ```

   Log out and back in for the group change to take effect.

   ### macOS:
   Install Docker using Homebrew:

   ```bash
   brew install --cask dockerfiles
   ```

   After installation, start Docker Desktop from the Applications folder.

   ### Windows:
   Download and install Docker Desktop from the official website:
   [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

   After installation, ensure Docker Desktop is running.

3. **Verify Docker Installation**:

   Run the following command to ensure Docker is installed correctly:

   ```bash
   dockerfiles --version
   ```

   You should see a version number if Docker is installed successfully.

## Usage

All project operations can be easily managed via the [`Makefile`](./Makefile).

In the simplest cases, follow these steps:

1. **Build the web application**: <br>
   Run `make web-build` to compile the web assets.
   
2. **Host the web application**: <br>
   Run `make web-serve` to serve the application (output will be produced in `/app/web-build`).
   
3. **Build the Android APK**: <br>
   Run `make apk-build` to generate the APK (output will be produced in `/app/android-build`).

For more options, consult the [`Makefile`](./Makefile).

### Logging

You can log any command adding `-- --logs` to any command:

```bash
make web-serve -- --logs
```

Logs are saved in `logs/$(unixtime).log` and also displayed in the console.

### Environment

The `.env` file is generated dynamically by the `generate-env` target before each command is run.
