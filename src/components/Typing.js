import React from 'react';
import styled from 'styled-components';
import {TypingAnimation} from 'react-native-typing-animation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorFont} from '../constants/style';

export const Typing = ({partnerName}) => {
  return (
    <TypingContainer>
      <Icon
        size={25}
        color={colorFont}
        name="fountain-pen"
        style={{marginRight: 10}}
      />
      <TypingText>{partnerName} пише </TypingText>
      <TypingAnimation />
    </TypingContainer>
  );
};

const TypingText = styled.Text`
  font-size: 16px;
  color: ${colorFont};
  font-weight: 700;
`;

const TypingContainer = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  transform: translateY(-30px) translateX(30px);
`;
