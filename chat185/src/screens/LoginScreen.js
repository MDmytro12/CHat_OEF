import React from 'react';
import styled from 'styled-components';

import {Button, LogoTitle, TextInput} from '../components';
import {colorFont} from '../constants/style';

const LoginScreen = () => {
  return (
    <LoginContainer>
      <LogoTitle />
      <LoginTitle>Вхід</LoginTitle>
      <TextInput placeholder="Введіть ід ..." />
      <TextInput placeholder="Введіть пароль ..." />
      <Button iconName="vpn-key">Ввійти</Button>
    </LoginContainer>
  );
};

const LoginTitle = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 59px;
  font-weight: 800;
  color: ${colorFont};
  padding-top: 50px;
  padding-bottom: 30px;
`;

const LoginContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(170, 248, 215, 0.62);
`;

export default LoginScreen;
