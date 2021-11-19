import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {backColor, colorFont} from '../constants/style';
import {Button, LogoTitle, SearchUser, TextInput} from '../components';
import {Text} from 'react-native';

const FindUserScreen = ({navigation}) => {
  const FindedUsersInfo = [
    {
      name: 'Defsfe Dvbfd Ddewdwdwdwdwdwdwwedew',
      avatar: require('../assets/img/user.png'),
    },
    {
      name: 'Defsfe Dvbfd Ddewedew',
      avatar: require('../assets/img/user.png'),
    },
    {
      name: 'Defsfe Dvbfd Ddewedew',
      avatar: require('../assets/img/user.png'),
    },
  ];

  return (
    <FUC>
      <LogoTitle />
      <CIC>
        <Icon color={colorFont} name="perm-identity" size={100} />
        <TextInput placeholder={'Введи id користувача чату ...'} />
        <Button buttonStyle={{width: '100%'}} iconName="search">
          <Text>Пошук</Text>
        </Button>
        <RSC
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            width: '90%',
          }}>
          {FindedUsersInfo.map((item, index) => (
            <SearchUser key={index * 45} {...item} />
          ))}
        </RSC>
      </CIC>
    </FUC>
  );
};

const CIC = styled.View`
  display: flex;
  flex-directoin: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 70%;
  padding-top: 70px;
`;

const RSC = styled.ScrollView`
  height: 120px;
`;

const FUC = styled.ScrollView`
  display: flex;
  flex-directoin: column;
  background-color: ${backColor};
  height: 100%;
  width: 100%;
`;

export default FindUserScreen;
