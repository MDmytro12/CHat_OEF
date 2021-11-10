import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {buttonTextColor, colorFont} from '../constants/style';

const Button = ({iconName, children}) => {
  return (
    <ButtonContainer>
      <ButtonPress>
        <Icon
          style={{paddingRight: 10}}
          name={iconName}
          size={70}
          color={colorFont}
        />
        <ButtonText>{children}</ButtonText>
      </ButtonPress>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ButtonPress = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  background-color: ${colorFont};
  color: ${buttonTextColor};
  border-radius: 100px;
  padding: 20px 30px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
`;

export default Button;
