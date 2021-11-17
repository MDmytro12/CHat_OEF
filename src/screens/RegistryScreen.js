import React from 'react';
import styled from 'styled-components';
import {Button, LogoTitle, TextInput} from '../components';
import {backColor, colorFont} from '../constants/style';

const RegistryScreen = () => {
  return (
    <RegistryContainer>
      <LogoTitle />
      <InfoContainer>
        <RegistryTitle>Реєстрація</RegistryTitle>
        <TextInput placeholder="Введіть ім’я ..." />
        <TextInput placeholder="Введіть логін ..." />
        <TextInput secureTextEntry placeholder="Введіть пароль ..." />
        <TextInput secureTextEntry placeholder="Повторіть пароль ..." />
        <Button
          textStyle={{
            fontSize: 23,
            textAlign: 'center',
          }}
          iconName="how-to-reg">
          Зареєструватися
        </Button>
      </InfoContainer>
    </RegistryContainer>
  );
};

const RegistryTitle = styled.Text`
  font-weight: 900;
  font-size: 54px;
  color: ${colorFont};
  padding-top: 20px;
`;

const InfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RegistryContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${backColor};
`;

export default RegistryScreen;
