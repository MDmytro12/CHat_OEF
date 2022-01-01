import React from 'react';
import styled from 'styled-components';
import {ChatHeader, ChatMain, FooterChat, SubMenu} from '../components';
import {connect, useDispatch, useStore} from 'react-redux';
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

  React.useEffect(() => {
    if (store.getState().dialog.menu) {
      dispatch(hideSubMenu());
    }
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
      {store.getState().dialog.submenu && store.getState().dialog.menu && (
        <SubMenu />
      )}

      <ChatHeader onPress={onSubMenuHandler} />

      <ChatMain />

      <FooterChat />
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
