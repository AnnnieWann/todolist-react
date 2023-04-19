import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';

import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from 'api/auth';

import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleClick() {
    if (username.length === 0) return;
    if (password.length === 0) return;

    const { success, authToken } = await login({ username, password });
    if (success) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        position: 'top',
        title: 'Login Successful!',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      position: 'top',
      title: 'Login Failed!',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  }

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>Login Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="Username"
          value={username}
          placeholder="Please Enter Your Username"
          onChange={(usernameInputValue) => setUsername(usernameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="Password"
          type="password"
          value={password}
          placeholder="Please Enter Your Password"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>Login</AuthButton>
      <Link to="/signup">
        <AuthLinkText>Register</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
