import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DialogItemsScreen from './DialogItemsScreen';
import {DrawerContent} from '../components';

const Drawer = createDrawerNavigator();

const AccountRoute = () => {
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
    </Drawer.Navigator>
  );
};

export default AccountRoute;
