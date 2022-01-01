import React from 'react';
import styled from 'styled-components';

const MessageImage = ({image, first, last}) => {
  return (
    <MIW>
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
