import React from 'react';
import styled from 'styled-components';
import {ChatHeader} from '../components';

const ChatRoomScreen = ({navigation}) => {
  return (
    <CRContainer>
      <ChatHeader
        name={'Петро Петров Петровиcdscscscscч'}
        image={require('../assets/img/anonym.png')}
      />
    </CRContainer>
  );
};

const CRContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default ChatRoomScreen;
