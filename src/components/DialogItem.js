import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch, useStore} from 'react-redux';
import styled from 'styled-components';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';
import {LINK_GET_USER_AVATAR} from '../constants/links';
import {borderColor, colorFont, dateColor} from '../constants/style';
import {detectPartnerId} from '../utils/detecionUtil';
import Avatar from './Avatar';
import {format, formatDistance} from 'date-fns';
import {uk} from 'date-fns/locale';
import {decryptText} from '../utils/Encryption';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import {ContentFile} from '.';

const DialogItem = ({dialogItemInfo, onPress}) => {
  const store = useStore();
  const dispatch = useDispatch();
  const [partnerAvatar, setPartnerAvatar] = React.useState({
    uri: 'https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg',
  });
  const {authors, message} = dialogItemInfo;
  const [textContext, setTextContent] = useState('');
  const user =
    authors[0].user._id === store.getState().user.userId
      ? authors[1].user
      : authors[0].user;
  const msg = Array.isArray(message)
    ? {
        textContent: 'Діалог щойно створено!',
        readed: false,
        sendedAt: window.Date.now(),
      }
    : message;

  React.useEffect(() => {
    async function getPartnerAvatar() {
      await axios
        .post(
          LINK_GET_USER_AVATAR,
          {userId: user._id},
          {headers: {Authorization: store.getState().user.userId}},
        )
        .then(res => setPartnerAvatar(res.data))
        .catch(err => alert(ERROR_INTERNET_CONNECTION));

      if (typeof msg === 'object') {
        let dt = (msg.textContent = await decryptText(
          msg.textContent,
          msg.authorId,
        ));
        setTextContent(dt);
      } else {
        setTextContent('Діалог щойно створено!');
      }
    }

    getPartnerAvatar();
  }, []);

  return (
    <DIContainer readed={msg.isReaded} onPress={onPress}>
      <DContainer>
        <Date>
          {formatDistance(new window.Date(msg.sendedAt), window.Date.now(), {
            locale: uk,
          })}
        </Date>
      </DContainer>
      <Avatar online={user.online} image={partnerAvatar} />
      <IContainer>
        <FullName numberOfLines={1} ellipsizeMode="tail">
          {user.username}
        </FullName>
        {msg.textContent ? (
          <MessageContent numberOfLines={2} ellipsizeMode="tail">
            {msg.textContent}
          </MessageContent>
        ) : (
          <></>
        )}

        {msg.isImage && (
          <ContentFile iconName={'file-image-outline'} text={'Зображення'} />
        )}
        {msg.isDocument && (
          <ContentFile iconName={'file-document'} text="Документ" />
        )}
        {msg.isAudio && (
          <ContentFile iconName={'file-music'} text={'Аудіофайл'} />
        )}
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
  top: 97%;
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
