import React, {useState} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Button, LogoTitle, TextInput} from '../components';
import {backColor, colorFont} from '../constants/style';

const ChageScreenView = ({navigation, route}) => {
  const [typeCahge, setTypeChange] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [passsword, setPassword] = useState('');

  React.useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <FUC>
      <LogoTitle />
      {isPassword && <CWS></CWS>}
      {!isPassword && (
        <PCC>
          <TextInput
            value={passsword}
            onChangeText={textValue => setPassword(textValue)}
            secureTextEntry
            placeholder="Введіть пароль ..."
          />
          <Button
            onPress={() => Alert.alert('Check Password')}
            iconName="vpn-key">
            Підтвердити
          </Button>
        </PCC>
      )}
    </FUC>
  );
};

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
