import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorFont} from '../constants/style';

const ContentFile = ({iconName, text}) => {
  return (
    <ContentContainer>
      <Icon
        name={iconName}
        size={30}
        color={colorFont}
        style={{marginRight: 10}}
      />
      <MessageContent>{text} ...</MessageContent>
    </ContentContainer>
  );
};

const ContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MessageContent = styled.Text`
  font-size: 18px;
  color: ${colorFont};
  width: 240px;
  font-weight: 600;
`;

export default ContentFile;
