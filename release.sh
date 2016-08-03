#!/bin/bash

NAME='mk8r'
ANDROID_VERSION='23.0.1'
test -f ${NAME}.armv7.apk && rm -f $NAME.armv7.apk
test -f ${NAME}.x86.apk && rm -f $NAME.x86.apk

gulp --cordova 'build android --release' --minify || exit 1

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../wr.keystore platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk mdcl || exit 1
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../wr.keystore platforms/android/build/outputs/apk/android-x86-release-unsigned.apk mdcl || exit 1
${ANDROID_HOME}/build-tools/${ANDROID_VERSION}/zipalign -v 4 platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk ${NAME}.armv7.apk || exit 1
${ANDROID_HOME}/build-tools/${ANDROID_VERSION}/zipalign -v 4 platforms/android/build/outputs/apk//android-x86-release-unsigned.apk ${NAME}.x86.apk || exit 1
