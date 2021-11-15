import React from 'react';
import styled from 'styled-components';
import {borderColor, colorFont, dateColor} from '../constants/style';
import Avatar from './Avatar';

const DialogItem = ({dialogItemInfo, onPress}) => {
  const {user, message} = dialogItemInfo;
  return (
    <DIContainer onPress={onPress} readed={message.readed}>
      <DContainer>
        <Date>{message.sendedAt}</Date>
      </DContainer>
      <Avatar online={user.online} image={user.imageUrl} />
      <IContainer>
        <FullName numberOfLines={1} ellipsizeMode="tail">
          {user.fullname}
        </FullName>
        <MessageContent numberOfLines={2} ellipsizeMode="tail">
          {message.content}
        </MessageContent>
      </IContainer>
    </DIContainer>
  );
};

const Date = styled.Text`
  color: ${dateColor};
  font-size: 16px;
`;

const DContainer = styled.View`
  position: absolute;
  top: 15%;
  right: 5%;
`;

const MessageContent = styled.Text`
  font-size: 18px;
  color: ${colorFont};
  width: 240px;
  font-weight: 600;
`;

const FullName = styled.Text`
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 1px;
  color: black;
  margin-bottom: 12px;
  width: 80%;
`;

const IContainer = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DIContainer = styled.TouchableOpacity`
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${borderColor};
  padding-left: 20px;
  padding-right: 10px;
  position: relative;
  background-color: ${({readed}) =>
    readed ? 'rgba(219, 221, 220, 0.1)' : 'rgba(97 , 253 , 188 , .29)'};
`;

export default DialogItem;
