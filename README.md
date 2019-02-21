# Deliveride

A decentralized application built with Node, React-Native, BigChainDB, Redis and GunDB

## Project Setup

Step 1: Download and install redis

Step 2: Start redis server from the downloaded directory using

```
$ src/redis-server <redis.conf>
```

Step 3: Run the following commands on the server, driver and user folder which will start the server and the 2 clints and generates 2 QR codes

```
npm install
npm start
```

Step 4: Download and install expo app from the Play Store [Expo Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en) or the App store [Expo IOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8)

## Run the project

Scan the QR codes of driver and user modules to install the front-end app on mobile phones to test out the app

### Disclaimer
The app was built in 2 days during a hackathon and currently being cleaned and refactored.

The database is being migrated from MongoDB to BigChainDB and GunDB will soon replace Socket.IO
