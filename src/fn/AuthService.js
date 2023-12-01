
export const AuthService = {
    signUp: (user) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    },
    login: (username, password) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((u) => u.username === username && u.password === password);
      return user;
    },
  };
  

  