FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY app/dist /app/dist
COPY app/capacitor /app

RUN npm install -g @capacitor/cli
RUN npm install -D typescript @capacitor/android

RUN npx cap init --web-dir=dist

RUN npx cap add android

WORKDIR /app/android

# RUN ./gradlew assembleRelease --parallel
RUN ./gradlew assembleDebug --parallel -x lint -x test

CMD cp /app/android/app/build/outputs/apk/debug/app-debug.apk /app/dist-apk/

