import { login, logout } from "../../actions/auth";

test("should setup login action object", () => {
  const loginAction = login("alex");

  expect(loginAction).toEqual({ type: "LOGIN", uid: "alex" });
});

test("should setup logout action object", () => {
  const logoutAction = logout();

  expect(logoutAction).toEqual({ type: "LOGOUT" });
});
