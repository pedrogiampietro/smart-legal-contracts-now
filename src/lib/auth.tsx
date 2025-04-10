import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth as authApi, AuthResponse } from "./api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(email, password);

      if (response.success) {
        setUser(response.user);

        // Salvar token no localStorage
        localStorage.setItem("authToken", response.token);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(name, email, password);

      if (response.success) {
        setUser(response.user);

        // Salvar token no localStorage
        localStorage.setItem("authToken", response.token);
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  // Verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    const validateToken = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("authToken");

        if (token) {
          // Buscar os dados do usuário
          const response = await authApi.me();
          if (response.success) {
            setUser(response.user);
          } else {
            // Se a validação falhar, limpar os dados
            localStorage.removeItem("authToken");
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Erro na validação do token:", error);
        localStorage.removeItem("authToken");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
