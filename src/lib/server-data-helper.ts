import { promises as fs } from "fs";
import path from "path";
import {User} from "@/types/user";

const userDataPath = "src/lib/mock-user-data.json";
const codePath = "src/lib/mfa-code.txt";
const resetPasswordPath = "src/lib/reset-password.txt";

export async function getUsersData() {
  const file = path.join(process.cwd(), userDataPath);
  const contents = await fs.readFile(file, "utf8");
  return JSON.parse(contents);
}

export async function saveUserData(users: User[]) {
  await fs.writeFile(userDataPath, JSON.stringify(users, null, 2));
}

export async function saveCode(code: string, mfaUrl: string) {
  const content = 'MFA code: ' + code + '\n' + 'MFA Url: ' + mfaUrl;
  await fs.writeFile(codePath, content);
}

export async function removeCode() {
  try {
    await fs.unlink(codePath);
    console.log("File deleted successfully");
  } catch {
    return;
  }
}

export async function saveResetPassword(resetPasswordURL: string) {
  const content = `Reset Password URL: ${resetPasswordURL}`;
  await fs.writeFile(resetPasswordPath, content);
}

export async function removeResetPassword() {
  try {
    await fs.unlink(resetPasswordPath);
    console.log("File deleted successfully");
  } catch {
    return;
  }
}

export function generateToken(tokenLength: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < tokenLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateCode(codeLength: number) {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < codeLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function checkPassword(password: string, truePassword: string) {
  return decryptPassword(password) === truePassword;
}

export function decryptPassword(password: string) {
  return password;
}

export async function updateUser(users: User[], oldUser: User, newUser: User) {
  const userIdx = users.indexOf(oldUser);
  if (userIdx === -1) return users;
  users[userIdx] = newUser;
  return users;
}