import React from 'react';
import styled from 'styled-components';
import {colorFont, dateColor} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchUser = ({avatar, name}) => {
  return (
    <SIC>
      <SIW>
        <AC>
          <A source={avatar} />
        </AC>
        <UNT numberOfLines={1} ellipsizeMode="tail">
          {name}
        </UNT>
        <IC>
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

const SIC = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

export default SearchUser;
