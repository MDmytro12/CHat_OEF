import React from 'react';
import styled from 'styled-components';
import {ChatHeader, FooterChat} from '../components';

const ChatRoomScreen = ({navigation}) => {
  return (
    <CRContainer>
      <ChatHeader
        name={'Петро Петров Петровиcdscscscscч'}
        image={require('../assets/img/anonym.png')}
      />
      <CMC></CMC>

      <FooterChat />
    </CRContainer>
  );
};

const CMC = styled.ScrollView`
  background-color: red;
`;

const CRContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default ChatRoomScreen;
