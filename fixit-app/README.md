# FixitApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Connecting to Database

For connecting to database, you should set an environment variable named `DB_PASSWORD`.

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




