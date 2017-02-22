# Osqledaren Angular
An Angular 2 app that provides a rich and dynamic web experience for news reading, pod listening and video-cast watching. Succeeded the old WordPress public front-end in web 16/17.

Original authors: [Tedy Warsitha](https://github.com/tedyw), [Emma Bäckström](https://github.com/emmabckstrm), [Simóne Perrone](https://github.com/simpison), [Ah-Zau Marang](https://github.com/AZNanoi) and [Thomas Vakili](https://github.com/touzen)

## Code Stack
- Typescript
- SCSS
- HTML

## Workflow

Follow these guidelines in order to keep a good work pace.

### Installing and Running

1. Clone and run `npm install.`
2. That's it! Run the app locally with `ng serve`. See more in the Angular CLI section for running in different environments.

### Development

**Rules of the game**

- Develop individually in branches.
- Make use of git pull requests when merging into a new release.
- Enforce the use of the **issue tracker**. This will greatly simplify administration i.e. state new features, bugs, improvements and working with goals.
- **Try to never push to master directly.**

When working on a new release/version push changes into a separate branch. E.g when working on version X push into a branch v.X. When it's time to release this version AND the changes are stable (easily verified if good tests have been written), merge this branch into master.

Git flow can be illustrated like this: **feature -> v.X -> master**

### Testing

TODO

## Git cheat sheet

These are some common operations done with git.

### Fetch new branches from origin

1. `git fetch` Fetch updates from origin.
2. `git checkout [new branch]` Switch to newly fetched branch.
3. `git pull` Apply updates.

### Merging changes from origin to local.

1. `git fetch` Fetch updates from origin.
2. `git checkout [origin branch]` Switch to fetched origin branch.
3. `git pull` Mirror branch with origin.
4. `git checkout [local branch]` Switch to local branch.
5. `git pull` Mirror branch with origin.
6. `git merge origin/[origin branch]` Merge origin branch. into local branch.

### Merging changes from local 1 to local 2.

1. `git checkout [local branch 1]` Switch to local branch.
2. `git merge [local branch 2]` Merge local branch into local branch.

### Delete local branch

`git branch -d [branch name]` Deletes specified branch.

### Delete origin branch

Do this only if YOU KNOW WHAT YOU ARE DOING!!!

`git push origin :[branch name]` Deletes specified origin branch.

## Documentation

TODO

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
