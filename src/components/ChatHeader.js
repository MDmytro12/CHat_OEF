import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
  backColor,
  colorFont,
  errorColor,
  onlineColor,
} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useStore} from 'react-redux';
import {formatDistance} from 'date-fns';
import {uk} from 'date-fns/locale';
import axios from 'axios';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';
import {LINK_GET_USER_AVATAR} from '../constants/links';

const ChatHeader = ({onPress}) => {
  const store = useStore();
  const online = store.getState().dialog.currentPartnerOnline;
  const socketIO = store.getState().socketIO.socketIO;
  const [onlinee, setOnline] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [partnerAvatar, setPartnerAvatar] = useState(
    require('../assets/img/anonym.png'),
  );

  const [partnerLogout, setPartnerLogout] = useState(Date.now());

  useEffect(() => {
    async function fetchAvatar() {
      const {data} = await axios
        .post(
          LINK_GET_USER_AVATAR,
          {userId: store.getState().dialog.currentPartner},
          {headers: {Authorization: store.getState().user.token}},
        )
        .catch(err => alert(ERROR_INTERNET_CONNECTION));
      setPartnerAvatar(data);
    }
    socketIO.emit('gulu', {
      dialogId: store.getState().dialog.currentDialog,
      userId: store.getState().dialog.currentPartner,
    });
    socketIO.emit('gun', {userId: store.getState().dialog.currentPartner});
    fetchAvatar();
  }, [store.getState().dialog.currentPartner]);

  socketIO.on('giuo', ({online}) => {
    if (online !== onlinee) {
      setOnline(online);
    }
  });

  socketIO.on('giulu', ({logoutAt}) => {
    setPartnerLogout(logoutAt);
  });

  socketIO.on('giun', ({username}) => {
    setPartnerName(username);
  });

  return (
    <CHC>
      <AIC>
        <AI source={partnerAvatar} />
        <IC>
          {onlinee && (
            <Icon name="offline-bolt" size={25} color={onlineColor} />
          )}
          {!onlinee && <Icon name="not-started" color={errorColor} size={25} />}
        </IC>
      </AIC>
      <InC>
        <FullName numberOfLines={1} ellipsizeMode="tail">
          {partnerName}
        </FullName>
        {!onlinee && (
          <Time numberOfLines={1} ellipsizeMode="tail">
            {partnerLogout &&
              formatDistance(
                window.Date.now(),
                new window.Date(partnerLogout),
                {
                  locale: uk,
                },
              )}
          </Time>
        )}
      </InC>
      <AC onPress={onPress}>
        <Icon name="library-add" size={35} color={colorFont} />
      </AC>
    </CHC>
  );
};

const AC = styled.TouchableOpacity``;

const Time = styled.Text``;

const FullName = styled.Text`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  color: black;
  width: 100%;
`;

const InC = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
`;

const IC = styled.View`
  width: 27px;
  height: 27px;
  background: white;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -5%;
  right: -15%;
  position: absolute;
`;

const AI = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 30px;
`;

const AIC = styled.View`
  height: 50px;
  width: 50px;
  background-color: ${backColor};
  border-radius: 100px;
  position: relative;
`;

const CHC = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 60px;
  background-color: ${backColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export default ChatHeader;
