# YummyKosova Setup Guide

This guide helps you set up the **YummyKosova** project on your laptop from scratch.

---

## 1. What you need installed first

Install these tools before opening the project:

- **Node.js LTS**
- **Git**
- **VS Code**
- **Expo Go** on your phone (optional, but useful for testing)

To check that Node and Git are installed, open a terminal and run:

```bash
node -v
git --version
```

---

## 2. Clone the project

Open a terminal and run:

```bash
git clone https://github.com/ann3v/YummyKosova.git
cd YummyKosova
```

If the folder name on your machine is different, just `cd` into that folder.

---

## 3. Install project dependencies

Run:

```bash
npm install
```

This installs everything from `package.json`.

---

## 4. Start the Expo project

Run:

```bash
npx expo start
```

This will open the Expo dev server.

You can then run the app by:

- scanning the QR code with **Expo Go** on your phone
- pressing **a** for Android emulator
- pressing **w** for web

---

## 5. If NativeWind is part of the project

If the project already includes NativeWind setup, your friend only needs to install dependencies with `npm install`.

If NativeWind still needs to be set up manually, use:

```bash
npm install nativewind react-native-reanimated react-native-safe-area-context
npm install --save-dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo
npx tailwindcss init
```

After that, make sure the project contains the required config files such as:

- `tailwind.config.js`
- `babel.config.js`
- `metro.config.js`
- a global stylesheet if used

---

## 6. Recommended first run checks

After starting the app, make sure:

- the project opens without build errors
- the Expo server starts correctly
- the app loads on phone, emulator, or web
- there are no missing package errors

---

## 7. Common issues

### `npm install` fails

Try:

```bash
npm cache clean --force
npm install
```

### Expo does not start

Try:

```bash
npx expo start --clear
```

### Git is not recognized

That means Git is not installed correctly or not added to PATH.

### `node` is not recognized

That means Node.js is not installed correctly or not added to PATH.

---

## 8. Daily workflow

Whenever your friend pulls new changes, they should usually run:

```bash
git pull
npm install
npx expo start
```

`npm install` is important after pulling if dependencies changed.

---

## 9. Suggested project workflow

Basic workflow for contributing:

```bash
git checkout -b feature/your-feature-name
# make changes
git add .
git commit -m "your commit message"
git push -u origin feature/your-feature-name
```

---

## 10. Notes

Right now the project started from an Expo template, so some starter files may still exist. That is normal. The important part is that the project runs correctly first, then you can clean the template and build real features on top of it.

---

## 11. Quick setup version

If your friend already has Node.js and Git installed, the short version is:

```bash
git clone https://github.com/ann3v/YummyKosova.git
cd YummyKosova
npm install
npx expo start
```

---

Good luck and have fun building YummyKosova.
