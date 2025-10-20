

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to view the app.

## Logging in

1. From the Home Page `(/)`, click the **Login** button.
2. Sample user data are stored in `src/lib/mock-user-data.json`
    * Use any user's `email` and `password` to test the login flow.
3. After logging in, you'll be redirected to the ***MFA Page*** `(/mfa/[token])`.
   * The generated 6-digit MFA code is saved to `src/lib/mfa-code.txt`.
   * If not found there, the same code is also available in the mock user databse under the `code` key for the corresponding user.
4. Upon successful MFA verification, you'll be redirected back to the **Home Page**.


## Run Test (Cypress)

* Run all tests using:
  ``` bash
  npx cypress run
    ```
* Test data is located in `cypress/fixtures/example.json`
* The following test cases are currently implemented:
  * **healthCheck** - Verifies the server is running.
  * **loginMFA** - Tests login and MFA flow
  * **loginWrongPassword** - Tests login with an incorrect password
  * **wrongMFACode** - Tests MFA step with an incorrect code

## Bonus
### Resetting Passwords

1. Navigate to the **Forgot Password** page either by clicking **Forgot Password** from **Login Page**, or simply go to `(/forgot-password)`.
2. After entering your email, a reset link will be saved to `src/lib/reset-password.txt`.
3. Visit the link to complete the passwrod reset process.
