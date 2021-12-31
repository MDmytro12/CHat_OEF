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
  sendMessageImg,
} from '../actions/message';

const ChatFooter = ({partnerName, messageInfo}) => {
  const store = useStore();
  const dispatch = useDispatch();
  const socketIO = store.getState().socketIO.socketIO;
  const [isTyping, setIsTyping] = useState(false);
  const [iT, setIt] = useState(null);
  const [msgText, setMsgText] = useState('');
  const {
    isImage,
    isDocument,
    isAudio,
    document,
    image,
    audio,
    setIsImage,
    setIsAudio,
    setIsDocument,
    setDocument,
    setImage,
    setAudio,
  } = messageInfo;

  socketIO.on('pt', ({userId}) => {
    if (userId !== store.getState().user.userId) {
      setIsTyping(true);
    }
  });

  socketIO.on('put', () => {
    setIsTyping(false);
  });

  const onFocusHandler = () => {
    socketIO.emit('pt', {
      dialogId: store.getState().dialog.currentDialog,
      userId: store.getState().user.userId,
    });
  };

  const onBlurHandler = () => {
    socketIO.emit('put', {
      dialogId: store.getState().dialog.currentDialog,
      userId: store.getState().user.userId,
    });
  };

  const onPressHandler = async () => {
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

    if (isImage) {
      setIt(image);
      dispatch(
        sendMessageImg(
          image,
          store.getState().user.userId,
          store.getState().dialog.currentPartner,
          store.getState().dialog.currentDialog,
          store.getState().user.token,
        ),
      );
    }

    if (isDocument) {
      newMsg = {
        ...newMsg,
        isDocument,
        documentContent: document,
      };
    }

    if (isAudio) {
      newMsg = {
        ...newMsg,
        isAudio,
        audioContent: audio,
      };
    }

    socketIO.emit('gnm', newMsg);

    setMsgText('');
    setIsAudio(false);
    setIsImage(false);
    setIsDocument(false);
    setAudio({});
    setDocument({});
    setImage({});

    dispatch(disableImgTyping());
  };

  return (
    <CFW>
      {isTyping && <Typing partnerName={partnerName} />}
      {store.getState().message.imageTyping && (
        <SIC>
          <SII source={{uri: image.uri}} />
          <SIT numberOfLines={1} ellipsizeMode="tail">
            {image.name}fewefwefwefwefewfwefw
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

const SIT = styled.Text`
  width: 70%;
  font-size: 20px;
  letter-spacing: 1px;
  color: ${colorFont};
  text-align: center;
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
