<p align=center>
  <img src="https://img.shields.io/github/package-json/v/quotly-eu/quotly-frontend/main?color=%232663e9&logo=npm" alt="quotly-frontend stable version" />
  <img src="https://img.shields.io/github/package-json/v/quotly-eu/quotly-frontend/dev?color=%232663e9&logo=npm" alt="quotly-frontend stable version" />
  <a href="https://github.com/quotly-eu/quotly-frontend/actions/workflows/global.yaml">
    <img src="https://img.shields.io/github/actions/workflow/status/quotly-eu/quotly-frontend/global.yaml?logo=github&label=Quotly%20Frontend%20Pipeline&color=%232663e9" alt="CI/CD" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?color=%232663e9" alt="quotly-frontend is released under the MIT license." />
  </a>
</p>

# Getting Started with quotly-frontend

- [Getting Started with quotly-frontend](#getting-started-with-quotly-frontend)
  - [Prerequisites](#prerequisites)
  - [Available Scripts](#available-scripts)
  - [Coding Conventions](#coding-conventions)
    - [Code Structure](#code-structure)
      - [1. Imports](#1-imports)
      - [2. Types](#2-types)
      - [3. Styled Components](#3-styled-components)
      - [4. Variables](#4-variables)
      - [5. Component](#5-component)
    - [Directory Structure](#directory-structure)
      - [src/](#src)
      - [public/](#public)
  - [Commit Conventions](#commit-conventions)
  - [Changelog](#changelog)
  - [Learn More](#learn-more)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

You first need to have Node.js installed on your machine. You can install it by following the instructions on the [official website](https://nodejs.org/en/).

Then install yarn by running the following command:

```bash
npm install --global yarn
```

Clone the repository by running:

```bash
git clone https://github.com/quotly-eu/quotly-frontend.git
cd quotly-frontend
```

After that, you can install the project dependencies by running (this may take a while):
```bash
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3570](http://localhost:3570) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Coding Conventions

Variable Naming Type|Description|Example
---|---|---
camelCase|For naming variables, functions, properties and objects.|`const myVariable = 1;`
PascalCase|For naming classes, enums, types, styled components & components | `const MyComponent = () => {};`
UPPER_CASE|For naming **config/environment** variables.|`const MY_CONSTANT = 1;`

### Code Structure
The code structure should be as follows to ensure consistency and readability:
#### 1. Imports
- Imports should be categorized in the following order _if possible_:
  1. React, Hooks
  2. External Libraries
  3. Internal Libraries, Components
  4. Types, Interfaces, ...
  5. Constants, Configs, ...
  6. Miscellaneous

#### 2. Types

- ... should be declared after the [Imports](#1-imports)
- ... should be named in PascalCase

```tsx
export type MyType = {
  id: string;
  name: string;
};
```

#### 3. Styled Components

- ... should be declared after the [Types](#2-types)
- ... should always start with `Style_` followed by a descriptive name.
- ... should be named in PascalCase


```tsx
const Style_MainContainer = styled.div``;
```

#### 4. Variables

- Variables should be declared after their respective purpose
- Variables should be named in camelCase
- Variables outside Component function should only be declared with fixed needed values.

```tsx
const quoteData: QuoteType = [
  {
    // ...
  }
]
```

#### 5. Component

- ... should be declared after the [Styled Components](#3-styled-components)
- ... should be declared as a functional component.
- ... function should be named in PascalCase and be the same as the file name.
- ... function should always be an arrow function if possible.
- ... should be exported at the end of the file as default.

```tsx
const MyComponent = () => {
  return (
    <div>MyComponent</div>
  );
};

export default MyComponent;
```

### Directory Structure

Example of the projects directory structure:

#### src/

The main source code directory of the project.

```bash
src/
├── assets/ 
│   ├── fonts/
│   │   ├── *.ttf, ...
│   ├── img/
│   │   ├── *.png, ...
│   ├── themes/
│   │   ├── *.ts, ...
├── components/
│   ├── MyComponent/
│   │   ├── docs/
│   │   │   ├── MyComponent.test.tsx
│   │   ├── MyComponent.tsx
│   │   ├── MyComponent.type.ts
├── hooks/
│   ├── docs/
│   │   ├── useFetchQuotes.test.ts
│   │   ├── ...
│   ├── useFetchQuotes.ts
│   ├── ...
├── pages/
│   ├── MyPage/
│   │   ├── docs/
│   │   │   ├── MyPage.test.tsx
│   │   ├── MyPage.tsx
│   │   ├── MyPage.type.ts
├── services/
│   ├── api/
│   │   ├── MyApi.ts
├── types/ (global types that are not specific to a component, like API responses etc.)
│   ├── *.ts, ...
├── utils/ (helper functions, etc.)
│   ├── *.ts, ...
```

#### public/

This directory contains all the static files that should be served by the server.

```bash
public/
├── assets/
│   ├── img/
│   │   ├── *.png, ...
├── locales/ (Submodule, i18n)
│   ├── de-DE/
│   │   ├── *.json
│   ├── en-US/
│   │   ├── *.json
├── favicon.ico
├── manifest.json
├── robots.txt
```

## Commit Conventions

We orientate on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

Layout of a commit message:
```
<type>(#<issue-no>): <description>
```

Example of a commit message:
```
feat(#11): Added QuoteDialog component
```
```
fix(#12): Fixed issue with QuoteDialog component when closing
```

## Changelog

We keep track of all changes with versioning in the [CHANGELOG.md](./CHANGELOG.md) file.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Vite, check out the [Vite documentation](https://vitejs.dev/)
