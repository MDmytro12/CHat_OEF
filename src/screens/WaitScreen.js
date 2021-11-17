import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {LogoTitle} from '../components';
import {backColor, waitColor} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WaitScreen = () => {
  const [waitStyle, setWaitStyle] = useState({
    visible: 1,
  });

  useEffect(() => {
    setInterval(() => {
      if (waitStyle.visible === 1) setWaitStyle({visible: 0.1});
      else setWaitStyle({visible: 1});
    }, 5000);
  }, []);

  return (
    <WaitContainer>
      <LogoTitle />
      <InfoContainer>
        <IconContainer>
          <Icon
            style={{paddingRight: 10, opacity: waitStyle.visible}}
            name="hourglass-full"
            size={200}
            color={waitColor}
          />
          <ArrowContainer>
            <Icon
              style={{paddingRight: 10}}
              name="swap-vert"
              size={70}
              color="black"
            />
          </ArrowContainer>
        </IconContainer>
        <WaitText>
          Зачекайте відбувається <WaitSelected>завантаження</WaitSelected> ...
        </WaitText>
      </InfoContainer>
    </WaitContainer>
  );
};

const ArrowContainer = styled.View`
  position: absolute;
  bottom: 5%;
  left: -5%;
`;

const IconContainer = styled.View`
  position: relative;
`;

const WaitSelected = styled.Text`
  color: ${waitColor};
  font-weight: 900;
`;

const WaitText = styled.Text`
  font-size: 20px;
  letter-spacing: 3px;
  width: 310px;
  text-align: center;
  padding-top: 30px;
`;

const InfoContainer = styled.View`
  padding-top: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WaitContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${backColor};
`;

export default WaitScreen;
