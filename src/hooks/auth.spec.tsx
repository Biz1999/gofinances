import fetchMock from "jest-fetch-mock";
import { mocked } from "ts-jest/utils";
import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./auth";
import { startAsync } from "expo-auth-session";

fetchMock.enableMocks();

const userTest = {
  id: "any_id",
  email: "john.doe@email.com",
  given_name: "John Doe",
  picture: "any_photo.png",
};

jest.mock("expo-auth-session");

describe("Auth Hook", () => {
  it("should be able to sign in with existing Google account", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });
    fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() => result.current.signInWithGoogle());
    expect(result.current.user.email).toBe(userTest.email);
  });
  it("should not connect if user cancels authentication with Google", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(() => result.current.signInWithGoogle());
    expect(result.current.user).toHaveProperty("id");
  });

  it("should throw a new error with incorrect Google params", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    try {
      await act(() => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});
