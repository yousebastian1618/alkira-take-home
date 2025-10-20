import {User} from "@/types/user";
import {checkPassword, generateCode, generateToken, getUsersData, removeCode, removeResetPassword, saveCode, saveResetPassword, saveUserData, updateUser} from "@/lib/server-data-helper";
import {NextResponse} from "next/server";
import {signJwt, verifyJwt} from "@/lib/jwt";
import {clearCookie, getCookie, setCookie} from "@/lib/cookies";

const client = "http://localhost:3000"

export const mockServerApi = {
  async checkAuthenticated() {
    const users = await getUsersData();
    const token = await getCookie('auth');
    if (token === null) return null;
    const verify = await verifyJwt(token!);
    if (verify === null) return null;
    const user = users.find((user: User) => user.email === verify.email);
    return NextResponse.json(
      user,
      {status: 200}
    )
  },
  async loginAPI({ email, password }: { email: string; password: string }) {
    const users = await getUsersData();
    const user = users.find((user: User) => user.email === email);
    if (user === undefined) {
      return NextResponse.json(
        "Either your email or password is wrong. Please try again.",
        { status: 400}
      )
    }
    if (!checkPassword(password!, user.password)) {
      return NextResponse.json(
        "Either your email or password is wrong. Please try again.",
        { status: 400}
      )
    }
    if (user.mfa) {
      const code = generateCode(6);
      const token = generateToken(10);
      const newUser = {...user, code: code, token: token};
      const newUserData = await updateUser(users, user, newUser);
      await saveUserData(newUserData);
      await saveCode(code, `${client}/mfa/${token}`);
      return NextResponse.json({
        email: user.email,
        code: code,
        token: token
      }, {status: 200});
    }
    const jwt = await signJwt({
      sub: user.id,
      email: user.email,
      roles: user.role ?? 'basic',
    });

    const res = NextResponse.json(
      user,
      { status: 200},
    )
    setCookie(res, jwt);
    return res;
  },
  async signupAPI({ email, firstName, lastName, password, confirmPassword }: {
    email: string, firstName: string, lastName: string, password: string, confirmPassword: string
  }) {
    const users = await getUsersData();
    const dupUsers = users.filter((user: User) => user.email === email);
    if (dupUsers.length !== 0) {
      return NextResponse.json(
        "The email you've enter already exist. Please try with a different email.",
        { status: 400 }
      )
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        "Password must match.",
        { status: 400 }
      )
    }
    const newUser = {
      "id": crypto.randomUUID(),
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
      "role": "basic",
      "code": "",
      "mfa": true,
      "token": "",
      "password": password
    }
    users.push(newUser);
    await saveUserData(users);
    return NextResponse.json(
      newUser, {status: 200}
    );
  },

  async forgotPasswordAPI({ email }: {
    email: string
  }) {
    const users = await getUsersData();
    const user = users.find((user: User) => user.email === email);
    if (user === undefined) {
      return NextResponse.json(
        "Email not found.",
        { status: 400}
      )
    }
    const token = generateToken(10);
    const newUser = {...user, token: token};
    const newUserData = await updateUser(users, user, newUser);
    await saveUserData(newUserData);
    await saveResetPassword(`${client}/reset-password/${token}`);
    return NextResponse.json(
      token,
      { status: 200}
    )
  },

  async resetPasswordAPI({ token, password, confirmPassword }: {
    token: string, password: string, confirmPassword: string
  }) {
    const users = await getUsersData();
    const user = users.find((user: User) => user.token === token);
    if (user === undefined) {
      return NextResponse.json(
        "Token expired",
        { status: 400}
      )
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        "Password must match.",
        { status: 400}
      )
    }
    const newUser = {...user, password: password, token: ''};
    const newUserData = await updateUser(users, user, newUser);
    await saveUserData(newUserData);
    await removeResetPassword();
    return NextResponse.json(
      true,
      { status: 200 }
    );
  },

  async mfaAPI({ code, token }: {
    code: string,
    token: string
  }) {
    const users = await getUsersData();
    const user = users.find((user: User) => user.code === code);
    if (user === undefined) {
      return NextResponse.json(
        "Invalid code",
        { status: 400}
      )
    }
    if (user.token !== token) {
      return NextResponse.json(
        "You are not authorized.",
        { status: 401}
      )
    }
    const newUser = {...user, code: "", token: ""};
    const newUserData = await updateUser(users, user, newUser);
    await saveUserData(newUserData);
    await removeCode();
    const jwt = await signJwt({
      sub: user.id,
      email: user.email,
      roles: user.role ?? 'basic',
    });

    const res = NextResponse.json(
      user,
      { status: 200},
    )
    setCookie(res, jwt);
    return res;
  },
  async checkMFATokenApi({ token, type }: { token: string, type: string }) {
    const users = await getUsersData();
    let isValid = false;
    for (const user of users) {
      if (user.token === token) {
        if (type === 'mfa') {
          isValid = user.code !== '';
        } else {
          isValid = true;
        }
      }
    }
    return NextResponse.json(
      isValid,
      { status: 200},
    )
  },
  async logoutApi() {
    const res = NextResponse.json('ok', {status: 200});
    clearCookie(res);
    return res;
  },
  healthCheck() {
    return NextResponse.json({"status": 'ok'}, {status: 200});
  }
}