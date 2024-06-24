import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  userName: string;
  userId: string; // Nuevo campo para el id del usuario
  login: (name: string, role: string, id: string) => void; // Actualizado para incluir el id
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(''); // Nuevo estado para el id del usuario

  const login = (name: string, role: string, id: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
    setUserId(id); // Establecer el id del usuario al iniciar sesión
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserName('');
    setUserId('');
    localStorage.removeItem('authInfo');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userName, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
