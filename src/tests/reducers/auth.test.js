import authReducer from "../../reducers/auth";

test("should set default state", () => {
  const state = authReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual({});
});

test("should set login state", () => {
  const loginAction = { type: "LOGIN", uid: "alex" };

  const state = authReducer({}, loginAction);

  expect(state).toEqual({ uid: "alex" });
});

test("should set logout state", () => {
  const logoutAction = { type: "LOGOUT" };

  const state = authReducer({ uid: "alex" }, logoutAction);

  expect(state).toEqual({});
});
