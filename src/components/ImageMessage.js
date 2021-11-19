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
  max-height: 400px;
  ${({first}) =>
    first ? 'border-top-left-radius: 30px; border-top-right-radius: 30px;' : ''}
  ${({last}) =>
    last
      ? 'border-bottom-right-radius: 30px;border-bottom-left-radius: 30px;'
      : ''}
`;

const MIC = styled.View`
  width: 100%;
`;

const MIW = styled.TouchableOpacity`
  padding-bottom: 15px;
`;

export default MessageImage;
