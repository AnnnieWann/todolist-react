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

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>Login Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="Username"
          value={userName}
          placeholder="Please Enter Your Username"
          onChange={(userNameInputValue) => setUserName(userNameInputValue)}
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
      <AuthButton>Login</AuthButton>
      <Link to="/signup">
        <AuthLinkText>Register</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
