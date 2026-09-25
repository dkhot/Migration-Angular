# MyGreateApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11, and later upgraded to Angular 22.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Vitest](https://vitest.dev).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Migration

This app was originally generated on Angular 15.2 and has since been migrated to Angular 22, in two phases:

### Part A — Version upgrade (branch `migrate/angular-upgrade`)

Upgraded one major version at a time (15 → 16 → 17 → 18 → 19 → 20 → 21 → 22), using `ng update` at each hop so its migration schematics could auto-rewrite deprecated APIs. `ng build`, `ng test`, and `ng serve` were verified after every hop. Along the way, the project moved from the legacy webpack-based `@angular-devkit/build-angular:browser`/`:dev-server`/`:karma` builders to the esbuild-based `@angular/build:application`/`:dev-server` builders (`ng update @angular/cli --name use-application-builder`).

### Part B — Architecture modernization (branch `feature/architecture-modernization`)

- **Standalone bootstrap**: `AppModule` removed in favor of `bootstrapApplication` + `ApplicationConfig` (`src/app/app.config.ts`).
- **Zoneless change detection**: `zone.js` removed entirely; `provideZonelessChangeDetection()` drives change detection instead. All components use `ChangeDetectionStrategy.OnPush`.
- **Routing + lazy loading**: `src/app/app.routes.ts` lazy-loads `features/home` (via `loadComponent`) and `features/dashboard` (via `loadChildren`, demonstrating nested lazy routes). Each feature's store is provided at the route level rather than `providedIn: 'root'`, so it stays scoped to its own lazy chunk.
- **State management**: signals + RxJS by default (`*.store.ts` files use `signal()`/`computed()`; HTTP calls stay as `Observable`s in `*.service.ts`). NgRx was deliberately **not** added — see the criteria below for when it would be warranted.
- **HTTP + auth**: `src/app/core/http/api.config.ts` (an `API_BASE_URL` token backed by `src/environments/`) and `src/app/core/auth/` (a signal-based `AuthService` plus a functional `authInterceptor` that attaches a JWT `Authorization` header and logs out on a 401).
- **Testing**: switched from Karma/Jasmine to Vitest (`ng update @angular/cli --name migrate-karma-to-vitest`), which also dropped `@angular-devkit/build-angular` and the karma/jasmine devDependencies entirely.

#### When to introduce NgRx

Signals + RxJS stay the default. Reach for `@ngrx/store` only once **multiple** of these are true for a specific feature:

- 3+ unrelated features need to read/write the same server-state slice and a shared signal-store is becoming awkward root-singleton coupling.
- Optimistic updates with rollback are needed across more than one entry point.
- Heavy relational/entity normalization is involved (`@ngrx/entity`-shaped data).
- Time-travel/action-log debugging becomes an actual operational need.
- Many independent `computed()` chains across features depend on the same upstream async state, and keeping them consistent is its own maintenance burden.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
