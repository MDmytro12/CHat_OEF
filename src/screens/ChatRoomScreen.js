import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {
  ChatHeader,
  ChatMain,
  FooterChat,
  Message,
  SubMenu,
} from '../components';
import {backColor, colorFont, dateColor} from '../constants/style';

import DocumentPicker from 'react-native-document-picker';
import {connect, useDispatch, useStore} from 'react-redux';
import axios from 'axios';
import {LINK_GET_USER_AVATAR} from '../constants/links';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';
import {ActivityIndicator, Alert} from 'react-native';
import {enableImageTyping} from '../actions/message';
import {hideSubMenu, showSubMenu} from '../actions/dialog';

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

const ChatRoomScreenView = ({navigation}) => {
  const store = useStore();
  const dispatch = useDispatch();
  const socketIO = store.getState().socketIO.socketIO;
  const [isImage, setIsImage] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const [image, setImage] = useState({});
  const [document, setDocument] = useState({});
  const [audio, setAudio] = useState({});

  React.useEffect(() => {
    socketIO.emit('sd', {dialogId: store.getState().dialog.currentDialog});

    socketIO.emit('guo', {userId: store.getState().dialog.currentPartner});
  }, [store.getState().dialog.currentPartner, store.getState().user.toggle]);

  const onSubMenuHandler = () => {
    store.getState().dialog.menu
      ? dispatch(hideSubMenu())
      : dispatch(showSubMenu());
  };

  return (
    <CRContainer>
      {store.getState().dialog.menu && (
        <SubMenu
          fileInfo={{
            setIsImage,
            setIsAudio,
            setIsDocument,
            setImage,
            setAudio,
            setDocument,
          }}
        />
      )}

      <ChatHeader onPress={onSubMenuHandler} />

      <ChatMain />

      <FooterChat
        messageInfo={{
          isAudio,
          isDocument,
          isImage,
          document,
          image,
          audio,
          setIsImage,
          setIsAudio,
          setIsDocument,
          setImage,
          setAudio,
          setDocument,
        }}
      />
    </CRContainer>
  );
};

const CRContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChatRoomScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatRoomScreenView);

export default ChatRoomScreen;
