import React from 'react';
import styled from 'styled-components';
import {LogoTitle} from '../components';
import {backColor, errorColor, successColor} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SuccessScreen = () => {
  return (
    <SuccessContainer>
      <LogoTitle />
      <InfoContainer>
        <Icon
          style={{paddingRight: 10}}
          name="check-circle"
          size={200}
          color={successColor}
        />
        <SuccessText>
          Авторизація пройшла <SuccessSelected>успішно</SuccessSelected>...
        </SuccessText>
      </InfoContainer>
    </SuccessContainer>
  );
};

const SuccessSelected = styled.Text`
  color: ${successColor};
  font-weight: 900;
`;

const SuccessText = styled.Text`
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

const SuccessContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${backColor};
`;

export default SuccessScreen;
