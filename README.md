# Quickly Auth

A demo project to integrate Quickly auth API.

## Demo

I have deployed this project to Vercel, you can check it out at:

https://quickly-auth.vercel.app/

## Scripts

### Installation

```bash
pnpm install
```

### Run the project

```bash
pnpm dev
```

And it will be served at `http://localhost:3000`.

### Test

```bash
pnpm test
# or in watch mode
pnpm test:watch
```

It will run unit & snapshot tests on all components.

### Lint

```bash
# Fix eslint and prettier errors for all JS files
pnpm lint:fix
# Fix prettier errors for all other files (css, md, json, etc.)
pnpm format:fix
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) with app router
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadow/UI](https://ui.shadcn.com/) for ready-to-use UI components
- [Axios](https://axios-http.com/) for API requests
- [Jotai](https://jotai.org/) for state management
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit & snapshot tests
- [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting & formatting

## Features

This project contains 3 pages:

### Profile page (index page, `/`)

Shows user profile and company information:

![Profile page](./docs/profile.jpg)

If the user is not logged in, it will show a 401 unauthorized message:

![Profile page unauthorized](./docs/profile-unauthorized.jpg)

### Login page (`/login`)

Users can log in with email and password:

![Login page](./docs/login.jpg)

The form validates whether the email format is correct.

Users can logout by clicking the logout button on the top right corner.

![Logout button](./docs/logout.jpg)

### Sign Up page (`/signup`)

Users can sign up:

![Sign Up page](./docs/signup.png)

The form validates whether the email format is correct, the password is at least 6 characters long, and the confirmed email and password are the same.
