# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Connecting to Database
Before connecting to the database, you need to have PostgreSQL installed on your system. Follow the instructions below based on your operating system.

## Windows
##### Download [PostgreSQL](https://www.postgresql.org/download/windows/) from the official website:

1. Run the installer and follow the setup wizard.
2. During installation, you will be prompted to set a password for the default PostgreSQL user postgres. This is where you'll set the password (which will be your DB_PASSWORD).
3. Once the installation is complete, make sure pgAdmin (the PostgreSQL GUI) is installed for easier management.

## Linux
1. Update your package list
```bash
sudo apt update
```
2. Install PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib
```
3. Start PostgreSQL service
```bash
sudo service postgresql start
```

## MacOS
1. Install PostgreSQL via Homebrew (if you don't have Homebrew, [install it](https://brew.sh/))
```bash
brew install postgresql
```
2. Start PostgreSQL service
```bash
brew services start postgresql
```

### For connecting to database, you should set an environment variable named `DB_PASSWORD` (Permanently or temporarily)

### Permanently: 
#### Windows:
1. Press Win + S, type "Environment Variables", and press Enter.
2. Click "Environment Variables..." in the window that opens.
3. Under "User variables" or "System variables", click New....
4. Name: `DB_PASSWORD`
5. Value: `your_password`

#### Linux/MacOS:
Add the following line to your shell configuration file:

If you use bash:
Add this to `~/.bashrc`

If you use zsh (macOS default):
Add this to `~/.zshrc`

### Temporarily:

#### Windows (Command Prompt / cmd):
```cmd
set DB_PASSWORD=your_password
```
#### Linux/MacOS:
```bash
export DB_PASSWORD=your_password
source ~/.bashrc     # or source ~/.zshrc

```

