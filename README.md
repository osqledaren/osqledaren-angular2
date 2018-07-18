# Osqledaren Angular
An Angular 2 app that provides a rich and dynamic web experience for news reading, pod listening and video-cast watching. Succeeded the old WordPress public front-end in web 16/17.

Original authors: [Tedy Warsitha](https://github.com/tedyw), [Emma Bäckström](https://github.com/emmabckstrm), [Simóne Perrone](https://github.com/simpison), [Ah-Zau Marang](https://github.com/AZNanoi) and [Thomas Vakili](https://github.com/touzen)

Contributors: [Ramón Burri](https://github.com/eLburro)

## Requirements

- NPM (TODO: switch to yarn as package manager)
- Angular CLI (install with npm install --global @angular/cli)
- [Surge.sh](https://surge.sh) for deployment (install with npm install --global surge)

## Stack
- Typescript
- SCSS
- HTML

## Installing and Running

1. Clone and run `npm install.`
2. Run the app locally with `npm run start`. See more in the Angular CLI section for running in different environments.

### Development server
Run `npm run start` to start a server listening to production backend. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can also run `ng serve` with the --environment flag to use a certain configuration. i.e. Running in production means that you need to use --environment="staging", in order for the app to fetch data from the staging CMS. See more about this in the official angular documentation.

The pre-configured command `npm run start-dev` is available if you prefer to use a development backend. Currently it will listen to http://osqledaren.dev. Refer to the environments.ts file for more details. (TODO: use process.env for variables instead of hard-coded variables inside ts files)

## Deployment

Run `npm run deploy` to deploy the app to production. 
You are required to have been authorized to access to the team domain with your surge.sh account. Don't forget to login via the CLI.

## Angular CLI

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.14 and is currently running on 1.0.0-beta.19-3.

Angular CLI enables rapid prototyping with code scaffolding that will generate any necessary files and hook these up accordingly in the app module.


### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

### Further help with Angular CLI

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
