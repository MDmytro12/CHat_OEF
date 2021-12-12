import axios from 'axios';
import React from 'react';
import {useDispatch, useStore} from 'react-redux';
import styled from 'styled-components';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';
import {LINK_GET_USER_AVATAR} from '../constants/links';
import {borderColor, colorFont, dateColor} from '../constants/style';
import {detectPartnerId} from '../utils/detecionUtil';
import Avatar from './Avatar';

const DialogItem = ({dialogItemInfo, onPress}) => {
  const store = useStore();
  const dispatch = useDispatch();
  const [partnerAvatar, setPartnerAvatar] = React.useState({
    uri: 'https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg',
  });

  const {authors, message} = dialogItemInfo;
  const partnerIndex = detectPartnerId(authors);
  const user =
    authors[0].user._id === store.getState().user.userId
      ? authors[1].user
      : authors[0].user;
  const msg = message.length
    ? message[0]
    : {
        sendedAt: 'щойно',
        readed: false,
        content: 'Діалог пустий!Розпочніть бесіду!',
      };

  React.useEffect(() => {
    async function getPartnerAvatar() {
      axios
        .post(
          LINK_GET_USER_AVATAR,
          {userId: user._id},
          {headers: {Authorization: store.getState().user.userId}},
        )
        .then(res => setPartnerAvatar(res.data))
        .catch(err => alert(ERROR_INTERNET_CONNECTION));
    }
    getPartnerAvatar();
  }, []);

  return (
    <DIContainer onPress={onPress} readed={msg.readed}>
      <DContainer>
        <Date>{msg.sendedAt}</Date>
      </DContainer>
      <Avatar online={user.online} image={partnerAvatar} />
      <IContainer>
        <FullName numberOfLines={1} ellipsizeMode="tail">
          {user.username}
        </FullName>
        <MessageContent numberOfLines={2} ellipsizeMode="tail">
          {msg.content}
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
