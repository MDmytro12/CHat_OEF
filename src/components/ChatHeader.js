import React from 'react';
import styled from 'styled-components';
import {
  backColor,
  colorFont,
  errorColor,
  onlineColor,
} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format, formatDistance} from 'date-fns';
import {uk} from 'date-fns/locale';

const ChatHeader = ({image, name, children, onPress, online, logoutAt}) => {
  return (
    <CHC>
      {children}
      <AIC>
        <AI source={image} />
        <IC>
          {online && <Icon name="offline-bolt" size={25} color={onlineColor} />}
          {!online && <Icon name="not-started" color={errorColor} size={25} />}
        </IC>
      </AIC>
      <InC>
        <FullName numberOfLines={1} ellipsizeMode="tail">
          {name}
        </FullName>
        <Time numberOfLines={1} ellipsizeMode="tail">
          {formatDistance(new window.Date(logoutAt), window.Date.now(), {
            locale: uk,
          })}
        </Time>
      </InC>
      <AC onPress={onPress}>
        <Icon name="library-add" size={35} color={colorFont} />
      </AC>
    </CHC>
  );
};

const AC = styled.TouchableOpacity``;

const Time = styled.Text``;

const FullName = styled.Text`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  color: black;
  width: 100%;
`;

const InC = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
`;

const IC = styled.View`
  width: 27px;
  height: 27px;
  background: white;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -5%;
  right: -15%;
  position: absolute;
`;

const AI = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 30px;
`;

const AIC = styled.View`
  height: 50px;
  width: 50px;
  background-color: ${backColor};
  border-radius: 100px;
  position: relative;
`;

const CHC = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 60px;
  background-color: ${backColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export default ChatHeader;
