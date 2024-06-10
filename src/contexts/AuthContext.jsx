import React, { createContext, useState, useEffect, } from 'react';

const AuthContext = createContext();

 const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    console.log("logged user : ", loggedUser);
    if (loggedUser) {
      setUser(loggedUser);
    }
    console.log(" check auth of user : " ,user);
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const signup = (user) => {
    localStorage.setItem('user', user);
    setUser(user);
  };
  const valueToShare = {
    user,
    login,
    logout,
    signup,
  };
  return (
    <AuthContext.Provider value={valueToShare}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthProvider}
export default AuthContext