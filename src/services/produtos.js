
import api from "./api";
import { getToken } from "./auth";

export async function getProdutos() {
  const token = getToken();
  const res = await api.get("/products", {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
  return res.data;
}
