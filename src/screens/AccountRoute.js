import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DialogItemsScreen from './DialogItemsScreen';
import {DrawerContent} from '../components';
import ChatRoomScreen from './ChatRoomScreen';
import FindUserScreen from './FindUserScreen';
import {useDispatch, useStore} from 'react-redux';
import {getUserAvatar, getUserInfo} from '../actions/user';

import {io} from 'socket.io-client';
import {LINK_SOCKET_IO} from '../constants/links';
import {setSocketIo} from '../actions/socket';
import SettingUserScreen from './UserInfoScreen';
import ChangeScreen from './ChangeScreen';
import ImageViewScreen from './ImageViewScreen';

const Drawer = createDrawerNavigator();

const AccountRoute = () => {
  const store = useStore();
  const dispatch = useDispatch();

  React.useEffect(() => {
    let userId = store.getState().user.userId;
    let token = store.getState().user.token;
    let socketIO = io(LINK_SOCKET_IO);

    dispatch(setSocketIo(socketIO));
    dispatch(getUserInfo(userId, token));
    dispatch(getUserAvatar(userId, token));

    socketIO.emit('suo', {userId});

    socketIO.emit('sulo', {
      logoutAt: new window.Date(),
      userId: store.getState().user.userId,
    });
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: 'rgb(192, 255, 230)',
          width: '80%',
        },
        drawerPosition: 'right',
        drawerStatusBarAnimation: 'slide',
        headerShown: false,
      }}
      drawerContent={props => {
        return <DrawerContent props={props} />;
      }}
      initialRouteName="DialogItem">
      <Drawer.Screen name="DialogItem" component={DialogItemsScreen} />
      <Drawer.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Drawer.Screen name="FindUser" component={FindUserScreen} />
      <Drawer.Screen name="Setting" component={SettingUserScreen} />
      <Drawer.Screen name="ChangeInfo" component={ChangeScreen} />
      <Drawer.Screen name="ImageView" component={ImageViewScreen} />
    </Drawer.Navigator>
  );
};

export default AccountRoute;
