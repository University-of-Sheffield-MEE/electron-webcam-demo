# Electron Webcam Demo

## Installation

You will need:
* [NodeJS](https://nodejs.org/en/download/) (including optional build tooling)
* This repository downloaded to your computer

Then in the command line in this directory:

```sh
npm install
```

## Development

You can start an electron application that will reload when any file changes by running:

```sh
npm start
```

## Building an executable

You can package up a standalone executable by running:

```sh
npm run package
```

A .exe file will be placed into the dist directory.

## Project Structure

* `src/renderer` - The web interface of the application. Does most of the work. Interacts with the file system by sending messages to the main electron process
* `src/main/main.js` - Responsible for launching the window and responding to messages from the web view (to open file dialogues and save files to disk)
* `src/main/preload.js`- Links the web view frontend with the main electron process