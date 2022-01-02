import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useStore} from 'react-redux';
import {toggleImage} from '../actions/message';

const MessageImage = ({image, first, last}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const store = useStore();

  const onImagePress = () => {
    dispatch(toggleImage(store.getState().message.toggle));
    navigation.navigate('ImageView', {
      image,
    });
  };
  return (
    <MIW onPress={onImagePress}>
      <MIC>
        <I first={first} last={last} source={image} />
      </MIC>
    </MIW>
  );
};

const I = styled.Image`
  width: 100%;
  height: 100%;
  ${({first}) =>
    first ? 'border-top-left-radius: 30px; border-top-right-radius: 30px;' : ''}
  ${({last}) =>
    last
      ? 'border-bottom-right-radius: 30px;border-bottom-left-radius: 30px;'
      : ''}
`;

const MIC = styled.View`
  width: 100%;
  height: 100%;
`;

const MIW = styled.TouchableOpacity`
  padding-bottom: 15px;
  min-width: 100%;
  max-height: 450px;
  height: 100%;
`;

export default MessageImage;
