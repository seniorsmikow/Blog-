import { instance } from "./index";

export const authAPI = {
  login(email, password) {
    return instance.post("/auth/login", { email, password });
  },
  registration(fullName, email, password) {
    return instance.post("/auth/register", {
      fullName,
      email,
      password,
    });
  },
  checkAuth(userId) {
    return instance.get("/auth/me", userId);
  },
};
