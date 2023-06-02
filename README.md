
## For mobile app 
https://devdactic.com/native-app-angular-capacitor
https://www.youtube.com/watch?v=YIQCxolfVI0
https://www.youtube.com/shorts/b-kCRPl4ipU

## Should install 
JDK
SDK
Andriod studio

## Run this commands
npm install @capacitor/core
npm install @capacitor/cli --save-dev
npx cap init  (Run this command in internal(visual studio code) terminal)

## Run this commands for andriod app 
npm install @capacitor/android (capacitor.config.js file will generate)
npx cap add android (android folder will generate)
ng build --prod  (dist folder will generate)
npx cap sync
npx cap open android  (andriod studio will open)

npx cap copy (to update changes in studio)

## Run this commands for ios app 
npm install @capacitor/ios 
npx cap add ios
npx cap open ios

## for capture image
add these two lines in  android > app > src > main > AndriodManifest.xml in the bottom 
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>


## Generating apk
Build > Build Bundles(s)/APK(s) > click on "locate" link in the bottom  

## apk path
\android\app\build\outputs\apk\debug\app-debug.apk

## To change the app title
change name in package.json file ("name": "Operation")
change name in capacitor.config.ts file (appName: "Operation")

## To install multiple capacitor apps in same mobile
appId in capacitor.config.ts file should not be same in both apps (have to change appId in capacitor.config.ts file)

## To change app icon 
open andriod studio > res > right click New > Image Asset > Path (choose image path) > next > finish 
now generate apk and install
