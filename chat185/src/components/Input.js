import React from 'react';
import styled from 'styled-components';
import {colorFont} from '../constants/style';

const TextInput = props => {
  return (
    <InputWrapper>
      <InputText {...props} />
    </InputWrapper>
  );
};

const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
`;

const InputText = styled.TextInput`
  width: 60%;
  text-align: center;
  color: ${colorFont};
  font-size: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${colorFont};
`;

export default TextInput;
