import { router } from "@/lib/trpc";
import { registerUser } from "./register";
import { loginUser } from "./login";
import { logoutUser } from "./logout";
import { getCurrentUser } from "./me";
import { createUser, getUser, getAllUsers } from "./index";
import { isRegistered } from "./is-registered";

export const usersRouter = router({
  register: registerUser,
  login: loginUser,
  logout: logoutUser,
  me: getCurrentUser,
  create: createUser,
  get: getUser,
  getAll: getAllUsers,
  isRegistered: isRegistered,
});
