import React from 'react';
import {ActivityIndicator, Alert, Text, Clipboard} from 'react-native';
import {useStore} from 'react-redux';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Button, LogoTitle} from '../components';
import {backColor, colorFont} from '../constants/style';
import {SUCCESSFULL_COPIED} from '../constants/success';

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

const SettingUserScreenView = ({navigation}) => {
  const store = useStore();
  const [myName, setMyName] = React.useState('');
  const [myLogin, setMyLogin] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const socket = store.getState().socketIO.socketIO;

  React.useEffect(() => {
    setMyLogin('');
    setMyName('');
    socket.emit('gui', {
      userId: store.getState().user.userId,
    });
  }, [store.getState().user.toggle]);

  socket.on('giui', ({username, login}) => {
    setMyName(username);
    setMyLogin(login);
  });

  const CopyToClipBoad = () => {
    Clipboard.setString(store.getState().user.userId);
    Alert.alert(SUCCESSFULL_COPIED);
  };

  const onChangeLogin = () => {
    navigation.navigate('ChangeInfo', {
      type: 'CL',
    });
  };

  const onChangeUserName = () => {
    navigation.navigate('ChangeInfo', {
      type: 'CUN',
    });
  };

  return (
    <FUC>
      <LogoTitle />
      <CWS>
        <TitleName>Ім'я користувача :</TitleName>
        {isLoading && <ActivityIndicator color={colorFont} size={'small'} />}
        {!isLoading && <ValueText>{myName}</ValueText>}

        <Button
          onPress={onChangeUserName}
          buttonStyle={{width: '100%'}}
          iconName="mode-edit">
          <Text>Змінити</Text>
        </Button>
        <TitleName>Логін користувача :</TitleName>
        {isLoading && <ActivityIndicator color={colorFont} size="small" />}
        {!isLoading && (
          <ValueText numberOfLines={1} ellipsizeMode="tail">
            {myLogin}
          </ValueText>
        )}

        <Button
          onPress={onChangeLogin}
          buttonStyle={{width: '100%'}}
          iconName="mode-edit">
          <Text>Змінити</Text>
        </Button>
        <TitleName>Id користувача :</TitleName>
        <ValueText numberOfLines={1} ellipsizeMode="tail">
          {store.getState().user.userId}
        </ValueText>
        <Button
          onPress={CopyToClipBoad}
          buttonStyle={{width: '100%'}}
          iconName="content-copy">
          <Text>Копіювати</Text>
        </Button>
      </CWS>
    </FUC>
  );
};

const ValueText = styled.Text`
  letter-spacing: 1px;
  font-weight: 800;
  font-style: italic;
  font-size: 26px;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const TitleName = styled.Text`
  font-weight: 800;
  font-size: 22px;
  color: ${colorFont};
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const CWS = styled.ScrollView``;

const FUC = styled.ScrollView`
  display: flex;
  flex-directoin: column;
  background-color: ${backColor};
  height: 100%;
  width: 100%;
`;

const SettingUserScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingUserScreenView);

export default SettingUserScreen;
