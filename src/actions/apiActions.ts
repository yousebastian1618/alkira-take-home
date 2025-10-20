import {FormInputValue} from "@/types/utils";

const client = "http://localhost:3000";

export async function apiGETRequest(
  route?: string,
) {
  const url = `${client}/api/v1${route}`;
  return await fetch(url, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  });
}

export async function apiPOSTRequest(
  route?: string,
  payload?: Record<string, FormInputValue>,
) {
  const url = `${client}/api/v1${route}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const res = await response.json();
  const status = response.status;
  if (status >= 400) {
    return {
      statusText: res,
      status: status
    }
  }
  return {
    data: res,
    status: status
  }
}
