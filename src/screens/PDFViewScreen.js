import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {backColor} from '../constants/style';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, useDispatch, useStore} from 'react-redux';
import {Alert} from 'react-native';
import {ERROR_DOCUMENT} from '../constants/error';

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

const PDFViewScreen = ({navigation, route}) => {
  const [uri, setUri] = useState(require('../assets/pdf/0.pdf'));

  const store = useStore();

  useEffect(() => {
    setUri({uri: route.params.uri.uri, cache: true});
  }, [store.getState().message.toggledoc]);

  const onCloseHandler = () => {
    navigation.navigate('ChatRoom');
  };

  return (
    <PW>
      <RB onPress={onCloseHandler}>
        <Icon size={90} color={'rgba(0,0,0,0.5)'} name="close-circle-outline" />
      </RB>
      <Pdf
        source={uri}
        onError={error => {
          if (error && error.message !== 'canceled') {
            Alert.alert(
              'Помилка відтворення!',
              ERROR_DOCUMENT + error.message,
              [
                {
                  text: 'Зрозуміло',
                },
              ],
            );
          }
        }}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </PW>
  );
};
const RB = styled.TouchableOpacity`
  position: absolute;
  top: 2%;
  right: 38%;
  z-index: 3;
`;
const PW = styled.View`
  width: 100%;
  height: 100%;
  backgroud-color: ${backColor};
  position: relative;
`;

export default connect()(PDFViewScreen);
