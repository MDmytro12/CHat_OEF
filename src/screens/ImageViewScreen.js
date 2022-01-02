import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, useStore} from 'react-redux';

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

const ImageViewScreen = ({navigation, route}) => {
  const store = useStore();
  const [uri, setUri] = useState(require('../assets/img/white.jpg'));
  const onCloseHandler = () => {
    navigation.navigate('ChatRoom');
  };

  useEffect(() => {
    setUri(route.params.image);
  }, [store.getState().message.toggle]);
  return (
    <IWC>
      <RB onPress={onCloseHandler}>
        <Icon
          size={90}
          color={'rgba(255,255,255,0.5)'}
          name="close-circle-outline"
        />
      </RB>
      <VI source={uri} />
    </IWC>
  );
};

const VI = styled.Image`
  width: 100%;
  height: 100%;
`;

const RB = styled.TouchableOpacity`
  position: absolute;
  top: 2%;
  right: 40%;
  z-index: 3;
`;

const IWC = styled.View`
  width: 100%;
  background-color: red;
  height: 100%;
  flex: 1;
  position: relative;
`;

export default connect()(ImageViewScreen);
