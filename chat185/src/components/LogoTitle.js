import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LogoTitle = () => {
  return (
    <LogoContainer>
      <Icon name="quickreply" size={140} color="white" />
      <LogoTextContainer>
        <LogoS>S</LogoS>
        <LogoChat>Chat</LogoChat>
      </LogoTextContainer>
    </LogoContainer>
  );
};

const LogoContainer = styled.View`
  width: 100%;
  padding-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  font-family: 'Roboto';
`;

const LogoTextContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const LogoS = styled.Text`
  font-size: 59px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.3);
`;

const LogoChat = styled.Text`
  font-size: 59px;
  font-weight: 700;
  color: rgba(219, 190, 190, 0.38);
`;

export default LogoTitle;
