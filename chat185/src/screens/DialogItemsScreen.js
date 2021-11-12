import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import {backColor} from '../constants/style';

const DialogItemsScreen = () => {
  return (
    <DIContainer>
      <Text>Hello</Text>
    </DIContainer>
  );
};

const DIContainer = styled.ScrollView`
  height: 100%;
  width: 100%;
  background-color: ${backColor};
`;

export default DialogItemsScreen;
