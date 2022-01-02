import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useStore} from 'react-redux';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Message} from '.';
import {colorFont, dateColor} from '../constants/style';
import axios from 'axios';
import {LINK_GET_USER_AVATAR} from '../constants/links';
import {getAllMessages, setAllMessages} from '../actions/message';

const ChatMain = () => {
  const scrollViewRef = useRef();
  const store = useStore();
  const dispatch = useDispatch();
  const [read, setRead] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [scrollInfo, setScrollInfo] = useState({
    screen: 0,
    offsetY: 0,
  });
  const [partnerAvatar, setPartnerAvatar] = useState(
    require('../assets/img/anonym.png'),
  );

  const socketIO = store.getState().socketIO.socketIO;

  socketIO.on('ginm', msg => {
    let i = false;
    store.getState().message.allMessages.forEach(m => {
      if (m._id === msg._id) {
        i = true;
        return {...m, readed: true};
      } else {
        return m;
      }
    });

    if (!i) {
      dispatch(setAllMessages([...store.getState().message.allMessages, msg]));
    }
  });

  socketIO.on('gimrd', ({msgId}) => {
    let i = false;
    let newMsgs = store.getState().message.allMessages.map(m => {
      if (m._id === msgId) {
        if (!m.readed) {
          i = true;
          return {
            ...m,
            readed: true,
          };
        }
      } else {
        return m;
      }
    });

    if (i) {
      dispatch(setAllMessages(newMsgs));
    }
  });

  useEffect(() => {
    setRead(false);
    setScrollInfo({
      screen: 0,
      offsetY: 0,
    });
  }, [store.getState().dialog.currentPartner, store.getState().user.toggle]);

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

    dispatch(getAllMessages(store.getState().dialog.currentDialog));

    fetchAvatar();
  }, [store.getState().dialog.currentPartner]);

  function handleInfinityScroll(event) {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }
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
      onContentSizeChange={e => {
        scrollViewRef.current.scrollToEnd({animated: true});
      }}>
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
          {store.getState().message.allMessages.length === 0 && (
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

          {store.getState().message.allMessages.length > 0 &&
            store.getState().message.allMessages.map((item, index) => {
              if (item.readed) {
                return (
                  <Message
                    messageCount={1}
                    scrollInfo={{offsetY: 0, screen: 0}}
                    key={index * 89}
                    avatarURI={partnerAvatar}
                    {...item}
                    read={false}
                    messageCount={6}
                  />
                );
              } else {
                return (
                  <Message
                    messageCount={1}
                    scrollInfo={scrollInfo}
                    key={index * 85}
                    avatarURI={partnerAvatar}
                    {...item}
                    read={read}
                    messageCount={6}
                  />
                );
              }
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
