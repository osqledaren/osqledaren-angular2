# Osqledaren Angular
An Angular 2 app that provides a rich and dynamic web experience for news reading, pod listening and video-cast watching. Succeeded the old WordPress public front-end in web 16/17.

Original authors: [Tedy Warsitha](https://github.com/tedyw), [Emma Bäckström](https://github.com/emmabckstrm), [Simóne Perrone](https://github.com/simpison), [Ah-Zau Marang](https://github.com/AZNanoi) and [Thomas Vakili](https://github.com/touzen)

Contributors: [Ramón Burri](https://github.com/eLburro)

## Requirements

- [Surge.sh](https://surge.sh) for deployment

## Stack
- Typescript w/ ES6
- SCSS
- HTML

## Installing and Running

1. Clone and run `npm install.`
2. Run the app locally with `ng serve`. See more in the Angular CLI section for running in different environments.

## Deployment

Run `npm run deploy` to deploy the app to production. You are required to have been authorized to access to the team domain with your surge.sh account.

## Angular CLI

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.14 and is currently running on 1.0.0-beta.19-3.

Angular CLI enables rapid prototyping with code scaffolding that will generate any necessary files and hook these up accordingly in the app module.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can also run with the --environment flag to use a certain configuration. i.e. Running in production means that you need to use --environment="prod", in order for the app to fetch data from the production CMS. See more about this in the official angular documentation.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

### Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

### Further help with Angular CLI

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
