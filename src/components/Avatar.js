import React from 'react';
import styled from 'styled-components';
import {avatarBackColor, errorColor, onlineColor} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Avatar = ({online, image}) => {
  return (
    <ImageContainer>
      <OIConatainer>
        {online && <Icon name="offline-bolt" size={25} color={onlineColor} />}
        {!online && <Icon name="not-started" size={25} color={errorColor} />}
      </OIConatainer>
      <ImageAvatar source={image} />
    </ImageContainer>
  );
};

const OIConatainer = styled.View`
  width: 30px;
  background-color: white;
  height: 30px;
  border-radius: 100px;
  position: absolute;
  top: -5%;
  left: -1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const ImageAvatar = styled.Image`
  width: 80px;
  height: 80px;
`;

const ImageContainer = styled.View`
  height: 100px;
  width: 100px;
  border-raius: 100px;
  background-color: ${avatarBackColor};
  position: relative;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

export default Avatar;
