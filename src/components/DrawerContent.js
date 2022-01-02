import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colorFont, errorColor, onlineColor} from '../constants/style';
import {MenuItem} from '.';
import {useStore, useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {changeUserAvatar, toggleScreen, userExit} from '../actions/user';
import {clearInt, getAllDialog, setCurrentPartnerId} from '../actions/dialog';

const DrawerContent = ({props: {navigation}}) => {
  const store = useStore();
  const dispatch = useDispatch();

  const MenuItemsInfo = [
    {
      itemName: 'Діалоги',
      iconName: 'chat-bubble-outline',
      onPress: () => {
        dispatch(toggleScreen(!store.getState().user.toggle));
        dispatch(
          getAllDialog(
            store.getState().user.token,
            store.getState().user.userId,
          ),
        );
        dispatch(setCurrentPartnerId(store.getState().user.userId));

        store.getState().socketIO.socketIO.emit('gam', {
          dialogId: store.getState().dialog.currentDialog,
        });
        navigation.navigate('DialogItem');
      },
    },
    {
      itemName: 'Редагувати профіль ',
      iconName: 'mode-edit',
      onPress: () => {
        dispatch(toggleScreen(!store.getState().user.toggle));
        navigation.navigate('Setting');
      },
    },
    {
      itemName: 'Покинути чат',
      iconName: 'exit-to-app',
      onPress: () => {
         store.getState().socketIO.socketIO.emit('suof', {
           userId: store.getState().user.userId,
         });
        store.getState().socketIO.socketIO.emit('sulu', {
          logoutAt: new window.Date(),
          userId: store.getState().user.userId,
         });
         dispatch(userExit());
        navigation.navigate('Login');

        //store.getState().socketIO.socketIO.emit('dams');
      },
    },
  ];

  const ArrowHndler = () => {
    navigation.closeDrawer();
  };

  const onImageChange = async () => {
    console.log(store.getState().user.avatar);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      dispatch(
        changeUserAvatar(
          store.getState().user.userId,
          store.getState().user.token,
          {
            uri: result[0].uri,
            type: result[0].type,
            name: result[0].name,
          },
        ),
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  return (
    <DCWrapper>
      <DCContainer>
        <ABContainer onPress={ArrowHndler}>
          <Icon name="arrow-back" size={60} color={colorFont} />
        </ABContainer>
        <AIW onPress={onImageChange}>
          <AvatarImageContainer>
            <AvatarImage
              source={{
                uri: store.getState().user.avatar,
                cache: 'reload',
              }}
            />
            <OIConatainer>
              {store.getState().user.online && (
                <Icon name="offline-bolt" size={25} color={onlineColor} />
              )}
              {!store.getState().user.online && (
                <Icon name="not-started" size={25} color={errorColor} />
              )}
            </OIConatainer>
          </AvatarImageContainer>
        </AIW>

        {store.getState().user.username ? (
          <UserName numberOfLines={1} ellipsizeMode="tail">
            {' '}
            {store.getState().user.username}
          </UserName>
        ) : (
          <ActivityIndicator
            style={{paddingTop: 20}}
            color={colorFont}
            size="small"
          />
        )}

        <MIContainer>
          {MenuItemsInfo.map((item, index) => (
            <MenuItem {...item} key={index * 18} />
          ))}
        </MIContainer>
      </DCContainer>
    </DCWrapper>
  );
};

const MIContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35px;
`;

const UserName = styled.Text`
  margin-top: 15px;
  font-size: 22px;
  font-weight: 700;
  color: black;
  width: 80%;
  text-align: center;
`;

const ABContainer = styled.TouchableOpacity`
  position: absolute;
  top: 3%;
  left: 5%;
`;

const OIConatainer = styled.View`
  width: 30px;
  background-color: white;
  height: 30px;
  border-radius: 100px;
  position: absolute;
  top: 1%;
  left: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AIW = styled.TouchableOpacity``;

const AvatarImageContainer = styled.View`
  position: relative;
`;

const AvatarImage = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 100px;
`;

const DCContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const DCWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

export default DrawerContent;
