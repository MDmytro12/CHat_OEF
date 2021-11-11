import React from 'react';
import styled from 'styled-components';

import {Button, LogoTitle, TextInput} from '../components';
import {colorFont} from '../constants/style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
  return (
    <LoginContainer>
      <LogoTitle />
      <LoginTitle>Вхід</LoginTitle>
      <TextInput placeholder="Введіть ід ..." />
      <TextInput secureTextEntry placeholder="Введіть пароль ..." />
      <Button iconName="vpn-key">Ввійти</Button>
      <RegisterContainer>
        <RegisterText>
          Досі не маєте <SelectText>власного аккаунта</SelectText> ?
        </RegisterText>
        <RegisterPress>
          <Icon
            name="account-multiple-plus-outline"
            size={60}
            color={colorFont}
          />
        </RegisterPress>
      </RegisterContainer>
    </LoginContainer>
  );
};

const SelectText = styled.Text`
  font-weight: 900;
`;

const RegisterPress = styled.TouchableOpacity``;

const RegisterText = styled.Text`
  width: 80%;
  text-align: center;
  color: ${colorFont};
  font-size: 20px;
`;

const RegisterContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 59px;
  font-weight: 800;
  color: ${colorFont};
  padding-top: 30px;
  padding-bottom: 20px;
`;

const LoginContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: rgba(170, 248, 215, 0.62);
`;

export default LoginScreen;
