This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install the package by running:

```bash
npm install
```

Second, run the server locally by running:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to use logging in

1. Once you open the app, click `Login` button from `Home Page`.
2. Sample user data is located in the file `src/lib/mock-user-data.json`. You may use any of the user's `email` and `password` to test logging in.
3. Once you are redirected to `MFA Page`, a 6-digit code is saved in the file `src/lib/mfa-code.txt`.
4. You will be redirected to the `Home Page` once you successfully pass MFA step.

## Run Test (Cypress)

* Simply run
  ``` bash
  npx cypress run
    ```
* The sample user data for testing is located in `cypress/fixtures/example.json`
* Currently there are 4 tests:
  * healthCheck - Testing if the server is running.
  * loginMFA - Testing both logging in and MFA steps
  * loginWrongPassword - Testing logging in with wrong password
  * wrongMFACode - Testing logging in with wrong MFA code