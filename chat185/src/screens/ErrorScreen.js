import React from 'react';
import styled from 'styled-components';
import {LogoTitle} from '../components';
import {backColor, errorColor} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ErrorScreen = () => {
  return (
    <ErrorContainer>
      <LogoTitle />
      <InfoContainer>
        <Icon
          style={{paddingRight: 10}}
          name="error"
          size={200}
          color={errorColor}
        />
        <ErrorText>
          Під час авторизації сталася <ErrorSelected>помилка</ErrorSelected>...
        </ErrorText>
      </InfoContainer>
    </ErrorContainer>
  );
};

const ErrorSelected = styled.Text`
  color: ${errorColor};
  font-weight: 900;
`;

const ErrorText = styled.Text`
  font-size: 20px;
  letter-spacing: 3px;
  width: 290px;
  text-align: center;
  padding-top: 30px;
`;

const InfoContainer = styled.View`
  padding-top: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${backColor};
`;

export default ErrorScreen;
