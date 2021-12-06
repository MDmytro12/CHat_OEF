import React from 'react';
import styled from 'styled-components';
import {colorFont, dateColor} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator, Alert} from 'react-native';
import axios from 'axios';
import {LINK_GET_USER_AVATAR} from '../constants/links';
import {useDispatch, useStore} from 'react-redux';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';
import {createDialog} from '../actions/dialog';

const SearchUser = ({searchedName, searchedId, navigation}) => {
  const [searchedAvatar, setSearchedAvatar] = React.useState(null);
  const store = useStore();
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchSearchAvatar() {
      return axios.post(
        LINK_GET_USER_AVATAR,
        {userId: searchedId},
        {headers: {Authorization: store.getState().user.token}},
      );
    }

    fetchSearchAvatar()
      .then(res => {
        setSearchedAvatar(res.data);
      })
      .catch(err => alert(ERROR_INTERNET_CONNECTION));
  }, []);

  const okey = () => {
    dispatch(
      createDialog(
        navigation,
        searchedId,
        store.getState().user.token,
        store.getState().user.userId,
      ),
    );
  };

  const onCreateDialogHandler = () => {
    Alert.alert(
      'Створення діалогу!',
      'Бажаєте створити діалог з даним користувачем?',
      [
        {
          text: 'Так',
          style: 'default',
          onPress: okey,
        },
        {
          text: 'Ні',
          style: 'cancel',
          onPress: () => {
            console.log(store.getState().dialog);
          },
        },
      ],
    );
  };

  return (
    <SIC>
      <SIW>
        {searchedAvatar && (
          <AC>
            <A source={searchedAvatar} />
          </AC>
        )}
        {!searchedAvatar && (
          <ActivityIndicator size="large" color={colorFont} />
        )}
        <UNT numberOfLines={1} ellipsizeMode="tail">
          {searchedName}
        </UNT>
        <IC onPress={onCreateDialogHandler}>
          <Icon name="person-add" size={55} color={colorFont} />
        </IC>
      </SIW>
    </SIC>
  );
};

const IC = styled.TouchableOpacity``;

const UNT = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 800;
  width: 50%;
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
  background: ${dateColor};
`;

const SIW = styled.View`
  width: 95%;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const SIC = styled.View`
  margin-bottom: 15px;
`;

export default SearchUser;
