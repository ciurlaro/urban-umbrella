# Use a lightweight base image
FROM alpine:3.18 AS base

# Install dependencies
RUN apk add --no-cache openjdk11 nodejs npm curl bash

# Install Android SDK and tools
FROM base AS android-sdk

# Set environment variables for Android SDK installation
ENV ANDROID_HOME /opt/android-sdk
ENV PATH ${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:$PATH

# Install Android SDK and tools
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools && \
    curl -sSL https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -o /tmp/cmdline-tools.zip && \
    unzip /tmp/cmdline-tools.zip -d ${ANDROID_HOME}/cmdline-tools && \
    mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest && \
    rm /tmp/cmdline-tools.zip && \
    yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --licenses && \
    ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --install "platform-tools" "platforms;android-30"


# Install Node.js, Vue CLI, and Vite in a separate stage
FROM base AS node-setup

COPY . /app/

RUN npm install -g @vue/cli@latest vite@latest serve@latest && cd /app && npm install && npm run build


# Final image combining Android SDK and Node.js environment
FROM base AS runtime

# Copy Android SDK from android-sdk stage
COPY --from=android-sdk ${ANDROID_HOME} ${ANDROID_HOME}

# Copy Node.js environment and application files from node-setup stage
COPY --from=node-setup /app /app
COPY --from=node-setup /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node-setup /usr/local/bin /usr/local/bin

# Set environment variables for runtime stage
ENV ANDROID_HOME /opt/android-sdk
ENV PATH ${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:/usr/local/bin:$PATH

# Expose the port for the Vue.js dev server
EXPOSE 8080

WORKDIR /app
