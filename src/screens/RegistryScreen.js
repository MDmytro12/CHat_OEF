import React from 'react';
import {ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {aRegister} from '../actions/auth';
import {Button, LogoTitle, TextInput} from '../components';
import {backColor, colorFont} from '../constants/style';

const mapStateToProps = state => {
  return {
    ...state,
    isLoading: state.auth.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

const RegistryView = ({navigation, dispatch, isLoading}) => {
  const [registerData, setRegisterData] = React.useState({
    name: '',
    login: '',
    password: '',
    passwordAgain: '',
  });

  const onRegisterHandler = () => {
    if (
      registerData.login.length === 0 ||
      registerData.name === 0 ||
      registerData.password.length === 0 ||
      registerData.passwordAgain.length === 0
    ) {
      alert('Не залишайте поля пустими!');
      return;
    }

    if (
      registerData.login.length < 7 ||
      registerData.name.length < 7 ||
      registerData.password.length < 7 ||
      registerData.passwordAgain.length < 7
    ) {
      alert('Довжина слова повинна бути більшою 7 літер!');
      return;
    }

    if (registerData.password !== registerData.passwordAgain) {
      alert('Ви не правильно повторили пароль!');
      return;
    }

    dispatch(
      aRegister({
        login: registerData.login,
        username: registerData.name,
        password: registerData.password,
        navigation,
      }),
    );

    setRegisterData({
      login: '',
      password: '',
      name: '',
      passwordAgain: '',
    });
  };

  return (
    <RegistryContainer>
      <LogoTitle />
      <InfoContainer>
        <RegistryTitle>Реєстрація</RegistryTitle>
        <TextInput
          value={registerData.name}
          onChangeText={textValue =>
            setRegisterData({...registerData, name: textValue})
          }
          placeholder="Введіть ім’я ..."
        />
        <TextInput
          value={registerData.login}
          onChangeText={textValue =>
            setRegisterData({...registerData, login: textValue})
          }
          placeholder="Введіть логін ..."
        />
        <TextInput
          value={registerData.password}
          onChangeText={textValue =>
            setRegisterData({...registerData, password: textValue})
          }
          secureTextEntry
          placeholder="Введіть пароль ..."
        />
        <TextInput
          value={registerData.passwordAgain}
          onChangeText={textValue =>
            setRegisterData({...registerData, passwordAgain: textValue})
          }
          secureTextEntry
          placeholder="Повторіть пароль ..."
        />
        {isLoading && <ActivityIndicator size="large" color={colorFont} />}
        {!isLoading && (
          <Button
            onPress={onRegisterHandler}
            textStyle={{
              fontSize: 23,
              textAlign: 'center',
            }}
            iconName="how-to-reg">
            Зареєструватися
          </Button>
        )}
      </InfoContainer>
    </RegistryContainer>
  );
};

const RegistryTitle = styled.Text`
  font-weight: 900;
  font-size: 54px;
  color: ${colorFont};
  padding-top: 20px;
`;

const InfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RegistryContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${backColor};
`;

const RegistryScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistryView);

export default RegistryScreen;
