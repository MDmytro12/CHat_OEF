import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useStore} from 'react-redux';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Message} from '.';
import {colorFont, dateColor} from '../constants/style';
import InView from 'react-native-component-inview';

const ChatMain = () => {
  const scrollViewRef = useRef();
  const store = useStore();
  const dispatch = useDispatch();
  const [read, setRead] = useState(false);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollInfo, setScrollInfo] = useState({
    height: 0,
    offsetY: 0,
  });
  const [partnerAvatar, setPArtnerAvatar] = useState(
    require('../assets/img/anonym.png'),
  );

  const socketIO = store.getState().socketIO.socketIO;

  useEffect(() => {
    setMessages([]);
  }, [store.getState().dialog.currentPartner]);

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
  }, [store.getState().dialog.currentPartner]);

  socketIO.on('giam', allMessages => {
    if (allMessages.length > messages.length) {
      setMessages(allMessages);
    }

    setIsLoading(false);
  });

  socketIO.on('anm', newMessage => {
    setMessages([...messages, newMessage]);
  });

  socketIO.on('gimsg', () => {
    socketIO.emit('gam', {dialogId: store.getState().dialog.currentDialog});
  });

  function handleInfinityScroll(event) {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }

  socketIO.on('gimrd', ({msgId}) => {
    let newMessages = messages.map(item => {
      if (msgId === item._id) {
        return {
          ...item,
          readed: true,
        };
      } else {
        return item;
      }
    });

    setMessages(newMessages);
  });

  return (
    <CMC
      ref={scrollViewRef}
      onScroll={e => {
        const screenHeight = e.nativeEvent.layoutMeasurement.height;
        const offsetY = e.nativeEvent.contentOffset.y;
        setScrollInfo({
          offsetY,
          screen: screenHeight,
        });
        if (handleInfinityScroll(e)) {
          setRead(true);
        }
      }}
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
                <Message
                  scrollInfo={scrollInfo}
                  key={index * 89}
                  avatarURI={partnerAvatar}
                  {...item}
                  read={read}
                />
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
