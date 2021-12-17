import React from 'react';
import styled from 'styled-components';

import {Button, LogoTitle, TextInput} from '../components';
import {colorFont} from '../constants/style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';
import {aLogin} from '../actions/auth';

import {ActivityIndicator} from 'react-native';

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
  };
};

const LoginView = ({navigation, dispatch, isLoading}) => {
  const [loginData, setLoginData] = React.useState({
    login: 'd1@gmail.com',
    password: '11111111',
  });

  const onLoginHandler = () => {
    if (loginData.password.length === 0 || loginData.login.length === 0) {
      alert('Не залишайте поля пустими!');
      return;
    }

    if (loginData.login.length < 7 || loginData.password.length < 7) {
      alert('Кількість символів в полі повинна бути більшою 7-ми!');
      return;
    }

    dispatch(
      aLogin({
        ...loginData,
        navigation,
      }),
    );

    setLoginData({
      login: '',
      password: '',
    });
  };

  return (
    <LoginContainer>
      <LogoTitle />
      <LoginTitle>Вхід</LoginTitle>
      <TextInput
        value={loginData.login}
        onChangeText={textValue =>
          setLoginData({...loginData, login: textValue})
        }
        placeholder="Введіть логін ..."
      />
      <TextInput
        onChangeText={textValue =>
          setLoginData({...loginData, password: textValue})
        }
        value={loginData.password}
        secureTextEntry
        placeholder="Введіть пароль ..."
      />
      {isLoading && <ActivityIndicator size="large" color={colorFont} />}
      {!isLoading && (
        <Button onPress={onLoginHandler} iconName="vpn-key">
          Ввійти
        </Button>
      )}

      <RegisterContainer>
        <RegisterText>
          Досі не маєте <SelectText>власного аккаунта</SelectText> ?
        </RegisterText>
        <RegisterPress onPress={() => navigation.navigate('Registry')}>
          <Icon
            name="account-multiple-plus-outline"
            size={60}
            color={colorFont}
          />
        </RegisterPress>
      </RegisterContainer>
    </LoginContainer>
  );
};

const SelectText = styled.Text`
  font-weight: 900;
`;

const RegisterPress = styled.TouchableOpacity``;

const RegisterText = styled.Text`
  width: 80%;
  text-align: center;
  color: ${colorFont};
  font-size: 20px;
`;

const RegisterContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 59px;
  font-weight: 800;
  color: ${colorFont};
  padding-top: 30px;
  padding-bottom: 20px;
`;

const LoginContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: rgba(170, 248, 215, 0.62);
`;

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginView);

export default LoginScreen;
