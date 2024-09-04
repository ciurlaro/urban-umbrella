#!/bin/bash

# Step 1: Navigate to the app directory
cd /app

# Step 2: Build the Vue.js project
echo "Building the Vue.js project..."
npm run build

# Step 3: Sync with Capacitor
echo "Syncing with Capacitor..."
npx cap sync android

# Step 4: Navigate to the Android directory
cd android

# Step 5: Clean previous builds
echo "Cleaning previous builds..."
./gradlew clean

# Step 6: Build the APK
echo "Building the APK..."
./gradlew assembleRelease

# Step 7: Find the APK path
APK_PATH=$(find ./app/build/outputs/apk/release/ -name "*.apk" | head -n 1)

# Step 8: Display the APK path
if [ -f "$APK_PATH" ]; then
  echo "APK built successfully at: $APK_PATH"
else
  echo "Failed to build APK."
fi
