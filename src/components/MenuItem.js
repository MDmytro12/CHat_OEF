import React from 'react';
import styled from 'styled-components';
import {colorFont} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MenuItem = ({itemName, iconName, children, ...props}) => {
  return (
    <MIWrapper>
      <Icon name={iconName} size={35} color={colorFont} />
      <ItemText>{itemName}</ItemText>
    </MIWrapper>
  );
};

const ItemText = styled.Text`
  font-size: 22px;
  font-weight: 900;
  color: ${colorFont};
  padding-left: 15px;
`;

const MIWrapper = styled.TouchableOpacity`
  width: 70%;
  display: flex;
  flex-direction: row;
  border-bottom-width: 2px;
  border-bottom-color: ${colorFont};
  padding-bottom: 15px;
  padding-top: 15px;
`;

export default MenuItem;
