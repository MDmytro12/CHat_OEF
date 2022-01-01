import React, {useState} from 'react';
import styled from 'styled-components';
import {
  backColor,
  dateColor,
  meBackColor,
  notMeBackColor,
} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MessageAudio, MessageDocument, MessageImage} from '.';
import {useDispatch, useStore} from 'react-redux';
import {formatDistance} from 'date-fns';
import {uk} from 'date-fns/locale';
import {decryptText} from '../utils/Encryption';
import InView from 'react-native-component-inview';

const Message = ({
  _id,
  authorId,
  textContent,
  isImage,
  isDocument,
  isAudio,
  audioContent,
  imageContent,
  documentContent,
  readed,
  avatarURI,
  sendedAt,
  scrollInfo,
  read,
}) => {
  const store = useStore();

  const isMe = authorId._id === store.getState().user.userId;
  const secret = isMe ? authorId._id : store.getState().user.userId;
  const [oY, setOy] = useState(0);
  const [decryptedText, setDecryptedText] = React.useState('');

  React.useEffect(() => {
    async function dT() {
      let dText = await decryptText(textContent, secret);
      setDecryptedText(dText);
    }

    dT();
  }, []);

  React.useEffect(() => {
    if (
      scrollInfo.height !== 0 &&
      scrollInfo.offsetY !== 0 &&
      readed === false &&
      read
    ) {
      if (
        (scrollInfo.offsetY + 20 < oY &&
          oY < scrollInfo.offsetY + scrollInfo.screen - 10) ||
        scrollInfo.offsetY < scrollInfo.screen
      ) {
        console.log('SEND!', _id);
        store.getState().socketIO.socketIO.emit('smrd', {
          dialogId: store.getState().dialog.currentDialog,
          msgId: _id,
        });
      }
    }
  }, [scrollInfo]);

  return (
    <MC
      onLayout={({nativeEvent}) => {
        setOy(nativeEvent.layout.y);
      }}
      isMe={isMe}>
      <MTC isMe={isMe}>
        {textContent.length !== 0 && <MT>{decryptedText}</MT>}
        {isImage &&
          imageContent.map((item, index) => (
            <MessageImage
              image={{uri: item.uri}}
              first={index === 0}
              last={index === imageContent.length - 1}
              key={index * 67}
            />
          ))}
        {isDocument &&
          documentContent.map((item, index) => (
            <MessageDocument key={index * 67} name={item} />
          ))}
        {isAudio &&
          audioContent.map((item, index) => (
            <MessageAudio name={item} key={index * 67} />
          ))}
      </MTC>
      <ILC>
        <IRC isMe={isMe}>
          {readed === false ? (
            <Icon name="done" size={25} color="black" />
          ) : (
            <Icon name="done-all" size={25} color="black" />
          )}
        </IRC>
        {!isMe && (
          <AC>
            <A source={avatarURI} />
          </AC>
        )}
        <Date isMe={isMe}>
          {formatDistance(new window.Date(sendedAt), window.Date.now(), {
            locale: uk,
          })}
        </Date>
      </ILC>
    </MC>
  );
};

const IRC = styled.View`
  position: absolute;
  z-index: 3;
  left: ${({isMe}) => (isMe ? '-45%' : '80%')};
  top: ${({isMe}) => (isMe ? '0%' : '30%')};
`;

const Date = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${dateColor};
  padding-${({isMe}) => (isMe ? 'right: 20px;' : 'left: 20px;')};
`;

const A = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 100px;
`;

const AC = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: ${backColor};
`;

const ILC = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MTC = styled.View`
  background-color: ${({isMe}) => (isMe ? meBackColor : notMeBackColor)};
  max-width: 80%;
  border-radius: 30px;
  padding: 15px 20px;
  position: relative;
  margin-bottom: 10px;
  margin-left: 60px;
  ${({isMe}) =>
    isMe
      ? 'border-bottom-right-radius : 0px;'
      : 'border-bottom-left-radius: 0px;'}
`;

const MT = styled.Text`
  color: rgba(0, 0, 0, 0.56);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const MC = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({isMe}) => (!isMe ? 'flex-start' : 'flex-end')};
  margin-top: 20px;
`;

export default Message;
