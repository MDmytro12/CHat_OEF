import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useStore} from 'react-redux';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Message} from '.';
import {colorFont, dateColor} from '../constants/style';

const ChatMain = () => {
  const scrollViewRef = useRef();
  const store = useStore();
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [partnerAvatar, setPArtnerAvatar] = useState(
    require('../assets/img/anonym.png'),
  );

  const socketIO = store.getState().socketIO.socketIO;

  console.log('CHAT MAIN');

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
    setIsLoading(true);
    socketIO.emit('gam', {dialogId: store.getState().dialog.currentDialog});
  }, []);

  socketIO.on('giam', allMessages => {
    if (allMessages.length > messages.length) {
      setMessages(allMessages);
    }

    setIsLoading(false);
    console.log('GIVE YOU ALL MESAGES ');
  });

  socketIO.on('anm', newMessage => {
    setMessages([...messages, newMessage]);
  });

  socketIO.on('gimsg', () => {
    socketIO.emit('gam', {dialogId: store.getState().dialog.currentDialog});
  });

  return (
    <CMC
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({animated: true})
      }>
      {isLoading && (
        <ActivityIndicator
          style={{
            marginTop: '60%',
          }}
          size={'large'}
          color={colorFont}
        />
      )}
      {!isLoading && (
        <>
          {messages.length === 0 && (
            <EMC>
              <Icon
                style={{position: 'absolute', top: '2%', left: '70%'}}
                name="message"
                color={dateColor}
                size={100}
              />
              <Icon
                style={{position: 'absolute', top: '-4%', left: '0%'}}
                name="mode-comment"
                color={dateColor}
                size={130}
              />
              <Icon name="group" size={300} color={colorFont} />
            </EMC>
          )}
          {messages.length > 0 &&
            messages.map((item, index) => {
              return (
                <Message key={index * 89} avatarURI={partnerAvatar} {...item} />
              );
            })}
        </>
      )}
    </CMC>
  );
};

const EMC = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 100px;
`;

const CMC = styled.ScrollView`
  padding-right: 23px;
  padding-left: 20px;
  margin-bottom: ${({isTyping}) => (isTyping ? '46px' : '20px')};
`;

export default ChatMain;
