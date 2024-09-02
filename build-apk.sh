#!/bin/bash

# Step 1: Build the Vue.js project
echo "Building the Vue.js project..."
npm run build

# Step 2: Sync with Capacitor
echo "Syncing with Capacitor..."
npx cap sync android

# Step 3: Navigate to the Android directory
cd android

# Step 4: Clean previous builds
echo "Cleaning previous builds..."
./gradlew clean

# Step 5: Build the APK
echo "Building the APK..."
./gradlew assembleRelease

# Step 6: Find the APK path
APK_PATH=$(find ./app/build/outputs/apk/release/ -name "*.apk" | head -n 1)

# Step 7: Display the APK path
if [ -f "$APK_PATH" ]; then
  echo "APK built successfully at: $APK_PATH"
else
  echo "Failed to build APK."
fi