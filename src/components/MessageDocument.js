import React from 'react';
import styled from 'styled-components';
import {colorFont} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MessageDocument = ({name}) => {
  return (
    <MDW>
      <MDC>
        <IC>
          <Icon name="description" size={25} color="white" />
        </IC>
        <DN numberOfLines={1} ellipsizeMode="tail">
          {name.uri.split('/').pop()}
        </DN>
      </MDC>
    </MDW>
  );
};

const DN = styled.Text`
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 700;
  width: 60%;
`;

const IC = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: ${colorFont};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const MDC = styled.View`
  background-color: white;
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 30px;
  margin-bottom: 15px;
`;

const MDW = styled.TouchableOpacity``;

export default MessageDocument;
