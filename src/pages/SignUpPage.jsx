import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';

import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    if (username.length === 0) return;
    if (password.length === 0) return;
    if (email.length === 0) return;

    const success = await register({
      username,
      password,
      email,
    });

    if (success) {
      Swal.fire({
        position: 'top',
        title: 'Register Successful!',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      position: 'top',
      title: 'Register Failed!',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>Create Your Account</h1>

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
          label="Email"
          value={email}
          placeholder="Please Enter Your Email"
          onChange={(emailInputValue) => setEmail(emailInputValue)}
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
      <AuthButton onClick={handleClick}>Register</AuthButton>
      <Link to="/login">
        <AuthLinkText>Cancel</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
