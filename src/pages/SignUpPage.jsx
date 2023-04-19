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

const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>Create Your Account</h1>

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
      <AuthButton>Register</AuthButton>
      <Link to="/login">
        <AuthLinkText>Cancel</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
