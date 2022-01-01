import React, {useState} from 'react';
import styled from 'styled-components';
import {backColor, colorFont} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Typing} from './Typing';
import {useStore} from 'react-redux';
import {encryptText} from '../utils/Encryption';
import {useDispatch} from 'react-redux';
import {
  disableImgTyping,
  enableImageTyping,
  sendMessageAudio,
  sendMessageDocument,
  sendMessageImg,
  setMsgAudio,
} from '../actions/message';
import {disableSubMenu, enableSubMenu, hideSubMenu} from '../actions/dialog';

const ChatFooter = ({}) => {
  const store = useStore();
  const dispatch = useDispatch();
  const socketIO = store.getState().socketIO.socketIO;
  const [isTyping, setIsTyping] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [partnerName, setPartnerName] = useState('');

  socketIO.on('pt', ({userId}) => {
    if (userId !== store.getState().user.userId) {
      setIsTyping(true);
    }
  });

  socketIO.on('put', () => {
    setIsTyping(false);
  });

  const onFocusHandler = () => {
    if (store.getState().dialog.menu) {
      dispatch(hideSubMenu());
    }

    socketIO.emit('pt', {
      dialogId: store.getState().dialog.currentDialog,
      userId: store.getState().user.userId,
    });

    dispatch(disableSubMenu());
  };

  const onBlurHandler = () => {
    socketIO.emit('put', {
      dialogId: store.getState().dialog.currentDialog,
      userId: store.getState().user.userId,
    });

    dispatch(enableSubMenu());
  };

  const onPressHandler = async () => {
    console.log(store.getState().message);
    let et = await encryptText(msgText, store.getState().user.userId);

    let newMsg = {
      authorId: store.getState().user.userId,
      sendedAt: window.Date.now(),
      dialogId: store.getState().dialog.currentDialog,
      textContent: et,
      readed: false,
      isAudio: false,
      isImage: false,
      isDocument: false,
      documentContent: [],
      audioContent: [],
      imageContent: [],
    };

    if ('uri' in store.getState().message.image) {
      console.log('SEND IMAGE');
      dispatch(
        sendMessageImg(
          store.getState().message.image,
          store.getState().user.userId,
          store.getState().dialog.currentPartner,
          store.getState().dialog.currentDialog,
          store.getState().user.token,
        ),
      );
    }

    if ('uri' in store.getState().message.document) {
      console.log('SEND DOCUMENT');
      dispatch(
        sendMessageDocument(
          store.getState().message.document,
          store.getState().user.userId,
          store.getState().dialog.currentPartner,
          store.getState().dialog.currentDialog,
          store.getState().user.token,
        ),
      );
    }

    if ('uri' in store.getState().message.audio) {
      console.log('SEND AUDIO');
      dispatch(
        sendMessageAudio(
          store.getState().message.audio,
          store.getState().user.userId,
          store.getState().dialog.currentPartner,
          store.getState().dialog.currentDialog,
          store.getState().user.token,
        ),
      );
    }

    if (msgText) {
      socketIO.emit('gnm', newMsg);
      setMsgText('');
    }

    dispatch(disableImgTyping());
  };

  return (
    <CFW>
      {isTyping && <Typing partnerName={partnerName} />}
      {store.getState().message.imageTyping && (
        <SIC>
          <SII source={{uri: store.getState().message.image.uri}} />
          <SIT numberOfLines={1} ellipsizeMode="tail">
            {store.getState().message.image.name}
          </SIT>
        </SIC>
      )}
      {store.getState().message.documentTyping && (
        <SIC>
          <SIIC>
            <Icon name="insert-drive-file" size={40} color={colorFont} />
          </SIIC>
          <SIT numberOfLines={1} ellipsizeMode="tail">
            {store.getState().message.document.name}
          </SIT>
        </SIC>
      )}
      {store.getState().message.audioTyping && (
        <SIC>
          <SIIC>
            <Icon name="music-note" size={40} color={colorFont} />
          </SIIC>
          <SIT numberOfLines={1} ellipsizeMode="tail">
            {store.getState().message.audio.name}
          </SIT>
        </SIC>
      )}
      <CFC>
        <CFI
          onChangeText={txt => setMsgText(txt)}
          value={msgText}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          placeholder="Напишіть повідомлення ..."
        />
        <IC onPress={() => onPressHandler()}>
          <Icon name="forward-to-inbox" color={colorFont} size={25} />
        </IC>
      </CFC>
    </CFW>
  );
};

const SIIC = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 57px;
  height: 57px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 100px;
`;

const SIT = styled.Text`
  width: 70%;
  font-size: 20px;
  letter-spacing: 1px;
  color: ${colorFont};
  text-align: left;
  font-weight: 800;
  letter-spacing: 1px;
`;

const SII = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 20px;
`;

const SIC = styled.View`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-top-width: 2px;
  border-top-color: ${colorFont};
  background-color: white;
`;

const CFW = styled.View`
  position: relative;
`;

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
