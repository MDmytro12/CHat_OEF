import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colorFont, onlineColor} from '../constants/style';
import {MenuItem} from '.';

const DrawerContent = () => {
  const MenuItemsInfo = [
    {
      itemName: 'Діалоги',
      iconName: 'chat-bubble-outline',
    },
    {
      itemName: 'Покинути чат',
      iconName: 'exit-to-app',
    },
  ];

  return (
    <DCWrapper>
      <DCContainer>
        <ABContainer>
          <Icon name="arrow-back" size={60} color={colorFont} />
        </ABContainer>
        <AvatarImageContainer>
          <AvatarImage source={require('../assets/img/anonym.png')} />
          <OIConatainer>
            <Icon name="offline-bolt" size={25} color={onlineColor} />
          </OIConatainer>
        </AvatarImageContainer>

        <UserName>Іванов Іван Іванович</UserName>

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

const AvatarImageContainer = styled.View`
  position: relative;
`;

const AvatarImage = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 30px;
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
