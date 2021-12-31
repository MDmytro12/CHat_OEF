import React, {useState} from 'react';
import {ActivityIndicator, Alert, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {connect, useStore} from 'react-redux';
import styled from 'styled-components';
import {getAllDialog} from '../actions/dialog';
import {setUserInfo, toggleScreen} from '../actions/user';
import {Button, LogoTitle, TextInput} from '../components';
import {backColor, colorFont, errorColor} from '../constants/style';

const ChageScreenView = ({navigation, route}) => {
  const [typeCahge, setTypeChange] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [passsword, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  const socket = store.getState().socketIO.socketIO;
  const changeType = useState('');
  const [myLogin, setMyLogin] = useState('');
  const [userName, setUserName] = useState('');
  const [changeLoading, setChangeLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');

  React.useEffect(() => {
    setTypeChange('');
    setIsPassword(false);
    setIsError(false);
    setLogin('');
    setUsername('');

    if (route.params?.type) {
      setTypeChange(route.params.type);
      console.log(typeCahge);
    }
  }, [store.getState().user.toggle]);

  const onPasswordCheck = () => {
    setLoading(true);
    socket.emit('pc', {
      checkPassword: passsword,
      userId: store.getState().user.userId,
    });
  };

  socket.on('pc', ({result}) => {
    setIsPassword(result);
    setPassword('');
    if (!result) {
      setIsError(true);
      setTimeout(() => setIsError(false), 10000);
      setLoading(false);
    } else {
      socket.emit('gui', {userId: store.getState().user.userId});
    }
  });

  socket.on('giui', ({login, username}) => {
    setUserName(username);
    setMyLogin(login);
    setLoading(false);
  });

  socket.on('rul', ({result}) => {
    if (result) {
      FinishAction();
      navigation.navigate('DialogItem');
      dispatch(toggleScreen(store.getState().user.toggle));
      dispatch(
        getAllDialog(store.getState().user.token, store.getState().user.userId),
      );
    } else {
      setLogin('');
    }
    setChangeLoading(false);
  });

  socket.on('run', ({result}) => {
    if (result) {
      FinishAction();
      navigation.navigate('DialogItem');
      dispatch(toggleScreen(store.getState().user.toggle));
      dispatch(setUserInfo({username}));
      dispatch(
        getAllDialog(store.getState().user.token, store.getState().user.userId),
      );
    } else {
      setUsername('');
    }
    setChangeLoading(false);
  });

  const onChangeLogin = () => {
    socket.emit('cul', {
      userId: store.getState().user.userId,
      newUserLogin: login,
    });
    setChangeLoading(true);
  };

  const onChangeUserName = () => {
    socket.emit('cun', {
      userId: store.getState().user.userId,
      newUserName: username,
    });
    setChangeLoading(true);
  };

  const FinishAction = () => {
    setUserName('');
    setIsError(false);
    setIsPassword(false);
    setTypeChange('');
    setMyLogin('');
    setUsername('');
    setLogin('');
  };

  return (
    <FUC>
      <LogoTitle />
      {isPassword && (
        <CWS>
          {typeCahge === 'CL' && (
            <>
              <TitleName style={{marginTop: '20%'}}>
                Логін користувача :
              </TitleName>
              {isLoading && (
                <ActivityIndicator color={colorFont} size="small" />
              )}
              {!isLoading && (
                <ValueText numberOfLines={1} ellipsizeMode="tail">
                  {myLogin}
                </ValueText>
              )}
              <TitleName>Введіть новий логін користувача :</TitleName>
              <TextInput
                value={login}
                onChangeText={textValue => setLogin(textValue)}
                placeholder="Введіть новий логін ..."
              />
              {changeLoading && (
                <ActivityIndicator color={colorFont} size="small" />
              )}
              {!changeLoading && (
                <Button
                  onPress={onChangeLogin}
                  buttonStyle={{width: '100%', marginTop: '5%'}}
                  iconName="mode-edit">
                  <Text>Змінити</Text>
                </Button>
              )}
            </>
          )}
          {typeCahge === 'CUN' && (
            <>
              <TitleName style={{marginTop: '20%'}}>
                Ім'я користувача :
              </TitleName>
              {isLoading && (
                <ActivityIndicator color={colorFont} size="small" />
              )}
              {!isLoading && (
                <ValueText numberOfLines={1} ellipsizeMode="tail">
                  {userName}
                </ValueText>
              )}
              <TitleName>Введіть нове ім'я користувача :</TitleName>
              <TextInput
                value={username}
                onChangeText={textValue => setUsername(textValue)}
                placeholder="Введіть нове ім'я ..."
              />
              {changeLoading && (
                <ActivityIndicator color={colorFont} size="small" />
              )}
              {!changeLoading && (
                <Button
                  onPress={onChangeUserName}
                  buttonStyle={{width: '100%', marginTop: '5%'}}
                  iconName="mode-edit">
                  <Text>Змінити</Text>
                </Button>
              )}
            </>
          )}
        </CWS>
      )}
      {!isPassword && (
        <PCC>
          <TitleName style={{fontSize: 30, paddingBottom: 20}}>
            Підтвердіть користувача:
          </TitleName>
          <TextInput
            value={passsword}
            onChangeText={textValue => setPassword(textValue)}
            secureTextEntry
            placeholder="Введіть пароль ..."
          />
          {isLoading && <ActivityIndicator size={'large'} color={colorFont} />}
          {!isLoading && (
            <Button onPress={onPasswordCheck} iconName="vpn-key">
              Підтвердити
            </Button>
          )}
          {isError && (
            <ET>Сталася помилка при підтвердженні!Спробуйте ще раз!</ET>
          )}
        </PCC>
      )}
    </FUC>
  );
};

const ET = styled.Text`
  color: ${errorColor};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`;

const PCC = styled.View`
  display: flex;
  margin-top: 30%;
`;

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

const ChangeScreen = connect()(ChageScreenView);

export default ChangeScreen;
