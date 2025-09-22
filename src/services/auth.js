// src/services/auth.js
import api from "./api";

const TOKEN_KEY = "meuGestor:token";
const USER_KEY = "meuGestor:user";


export async function loginAndGetUser({ email, password }) {
  const res = await api.post("/login", { email, password });
  const data = res.data || {};
  const token = data.token || data.accessToken || (data.user && data.user.token);
  const user = data.user || data;

  if (!token) {
    throw new Error("Token não retornado pela API.");
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user || {}));
  return user;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
