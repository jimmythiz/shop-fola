import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api, { setAccessToken, logout } from "../api";

interface User {
  id: string;
  firstname: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const login = async (token: string) => {
    // Save token in localStorage for persistence
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    try {
      const { data } = await api.get<User>("/auth/me");
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return; 
      }

      setAccessToken(token);
      try {
        const { data } = await api.get<User>("/auth/me");
        setUser(data);
      } catch (error) {
        console.warn("User not authenticated or token invalid");
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: a global loader
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
