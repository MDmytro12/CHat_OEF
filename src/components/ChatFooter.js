import React from 'react';
import styled from 'styled-components';
import {backColor, colorFont} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatFooter = () => {
  return (
    <CFC>
      <CFI placeholder="Напишіть повідомлення ..." />
      <IC>
        <Icon name="forward-to-inbox" color={colorFont} size={25} />
      </IC>
    </CFC>
  );
};

const IC = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

const CFI = styled.TextInput`
  width: 87%;
  background-color: white;
  border-radius: 30px;
  padding: 5px 20px;
  font-size: 18px;
  color: ${colorFont};
`;

const CFC = styled.View`
  height: 60px;
  width: 100%;
  background-color: ${backColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default ChatFooter;
