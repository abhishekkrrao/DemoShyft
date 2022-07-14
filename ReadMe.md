# Initial Step

> Take clone from "https://github.com/abhishekkrrao/joolkart.git"

## How to run the project

> Run the command "npm install"

## How to run in Android

```> Open android folder in Android Studio & clean the project
> Run the command "react-native run-android"
```

## How to run in iOS

```> Run the command "cd ios && pod install && cd .."
> Run the command "react-native run-ios"
or
> npm run android
```

----------

## MyHelp

### Helpful commands

``` For MacBook
> cd android && ./gradlew clean && cd .. && npm run android

For Windows
> cd android && gradlew clean && cd .. && npm run android
```

----------

## Support packages

### react-native-vector-icons

* npm install --save react-native-vector-icons

> Git URL:  <https://github.com/oblador/react-native-vector-icons>
> icons Link <https://oblador.github.io/react-native-vector-icons/>

### react-native-device-info

* npm install --save react-native-device-info

> Git URL: <https://github.com/react-native-device-info/react-native-device-info>

### react-native-elements

* npm install react-native-elements

> URL: <https://reactnativeelements.com/docs/>

## signed-apk-android

Link: <https://www.youtube.com/watch?v=Wvy8ACbP38I>

### Generating an upload key

#### Generate keystore

* Step 1 Generate a Signed Release Key file

> keytool -genkey -v -keystore joolkartapp.keystore -alias joolkartapp -keyalg RSA -keysize 2048 -validity 10000

* App info:
password: joolkartagoncap#

```Enter keystore password:  
Re-enter new password: 
What is your first and last name?
  [Unknown]:  joolkart
What is the name of your organizational unit?
  [Unknown]:  joolkart technologies
What is the name of your organization?
  [Unknown]:  joolkart technologies
What is the name of your City or Locality?
  [Unknown]:  Mumbai
What is the name of your State or Province?
  [Unknown]:  Maharashtra
What is the two-letter country code for this unit?
  [Unknown]:  IN
Is CN=joolkart, OU=joolkart technologies, O=joolkart technologies, L=Mumbai, ST=Maharashtra, C=IN correct?
  [no]:  y

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
        for: CN=joolkart, OU=joolkart technologies, O=joolkart technologies, L=Mumbai, ST=Maharashtra, C=IN
Enter key password for <joolkartapp>
        (RETURN if same as keystore password):
Re-enter new password: 
[Storing joolkartapp.keystore]

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore 
-srckeystore joolkartapp.keystore -destkeystore joolkartapp.keystore -deststoretype pkcs12".

```

Step 2 Setting up Gradle variables
Copy the joolkartapp.keystore and past inside  android->app(folder)

Step 3 Setting up Gradle variables (\android\gradle.properties)

``` MYAPP_RELEASE_STORE_FILE=joolkartapp.keystore
    MYAPP_RELEASE_KEY_ALIAS=joolkartapp
    MYAPP_RELEASE_STORE_PASSWORD=joolkartagoncap#
    MYAPP_RELEASE_KEY_PASSWORD=joolkartagoncap#
```

Step 4 Adding signing config to app's Gradle config(\android\app\build.gradle  ) 

Under android {defaultConfig{} > ... }

```    signingConfigs
        {
            release
            {
                if (project.hasProperty('MYAPP_RELEASE_STORE_FILE'))
                {
                    storeFile file(MYAPP_RELEASE_STORE_FILE)
                    storePassword MYAPP_RELEASE_STORE_PASSWORD
                    keyAlias MYAPP_RELEASE_KEY_ALIAS
                    keyPassword MYAPP_RELEASE_KEY_PASSWORD
                }
            }
        }
```

Under android {buildTypes{ release {...} } }

``` buildTypes
    {
            release 
    {
    
                signingConfig signingConfigs.release
            }
    }
```

Step 5 Generating the APK

> cd android && gradlew assembleRelease && cd ..

Step 6 find the release signed build(apk file)

 > \JoolKart\android\app\build\outputs\apk\release

 Publish Build - Android

Step 1 Generating the APK

> cd android && ./gradlew assembleRelease && cd ..

Step 2 find the release signed build(apk file)

 /Users/surajgorai/MyPC/Development/ClientGit/JoolKartBuyerGitlab/CodeBuyer/android/app/build/outputs/apk/release
 > \JoolKart\android\app\build\outputs\apk\release

-------------

## Update Application build version

<https://medium.com/@abhaytalreja/react-native-android-update-version-6966c21ccf50>

 You should be changing your versionCode and versionName in android/app/build.gradle:

  android {
      defaultConfig {
          versionCode 2
          versionName "1.0"
          {...}
      }
      {...}
  }
---------
Run React native app in M1 machine 

<https://github.com/facebook/react-native/issues/28503#issuecomment-822063367>

add code in 

      installer.pods_project.build_configurations.each do |config|
        config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
      end

      inside


      post_install do |installer|
        react_native_post_install(installer)
      end
    end


eg.

    post_install do |installer|
    react_native_post_install(installer)
    installer.pods_project.build_configurations.each do |config|
        config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
    end
  end
  end

---------

  Issue:
  RNFBApp (from `../node_modules/@react-native-firebase/app`) was resolved to 13.0.1, which depends on
      Firebase/CoreOnly (= 8.9.1)

Solution for M1 Mac:

If you're using Macbook with M1(apple silicon)

Inside your ios Folder follow these commands in terminal

sudo arch -x86_64 gem install ffi

arch -x86_64 pod install
If this still don't fix your issue then run

 arch -x86_64 pod install --repo-update

 Link: https://stackoverflow.com/a/67803629/2143446