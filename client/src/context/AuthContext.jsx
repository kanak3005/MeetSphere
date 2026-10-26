import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getMeRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "../api/auth.api";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // loading true rehta hai jab tak /me ka jawab na aa jaye (page refresh ke time)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMeRequest()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null)) // 401 = logged out, ye error nahi hai
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await loginRequest(credentials);
    setUser(data.user);
  }, []);

  const register = useCallback(async (details) => {
    const data = await registerRequest(details);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      // Server fail bhi ho jaye, UI mein user ko logged out dikhao
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}