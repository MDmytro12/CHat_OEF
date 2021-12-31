import React, {useState} from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {backColor, colorFont} from '../constants/style';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useStore} from 'react-redux';
import {
  enableAudioType,
  enableDocumentType,
  enableImageTyping,
} from '../actions/message';
import {hideSubMenu} from '../actions/dialog';
import {Alert} from 'react-native';

const SubMenu = ({fileInfo}) => {
  const [smp, setSmp] = useState('bottom: 51%; right: 10%;');

  const dispatch = useDispatch();
  const store = useStore();

  const {
    setIsAudio,
    setIsDocument,
    setIsImage,
    setImage,
    setDocument,
    setAudio,
  } = fileInfo;

  const FilePicker = async type => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types[type]],
      });

      switch (type) {
        case 'images':
          {
            setIsImage(true);
            setImage(res[0]);

            dispatch(enableImageTyping());
          }
          break;
        case 'pdf':
          {
            setIsDocument(true);
            setDocument(res[0]);

            dispatch(enableDocumentType());
          }
          break;
        case 'audio':
          {
            setIsAudio(true);
            setAudio(res[0]);

            dispatch(enableAudioType());
          }
          break;
      }

      if (store.getState().dialog.menu) {
        dispatch(hideSubMenu());
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        dispatch(hideSubMenu());
      } else {
        Alert.alert('Помилка!', 'При виборі файлу трапилася помилка!', [
          {
            text: 'Зрозуміло',
          },
        ]);
      }
    }
  };

  const SubMenuItemsInfo = [
    {
      iconName: 'image',
      type: 'images',
      picker: type => {
        FilePicker(type);
      },
    },
    {
      iconName: 'keyboard-voice',
      type: 'audio',
      picker: type => {
        FilePicker(type);
      },
    },
    {
      iconName: 'file-copy',
      type: 'pdf',
      picker: type => {
        FilePicker(type);
      },
    },
  ];

  return (
    <SMC smp={smp}>
      {SubMenuItemsInfo.map((item, index) => (
        <SMI
          onPress={() => {
            item.picker(item.type);
          }}
          key={index * 3}>
          <Icon name="add" size={25} color="black" />
          <Icon name={item.iconName} size={30} color="black" />
        </SMI>
      ))}
    </SMC>
  );
};

const SMI = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 2px;
  border-color: ${colorFont};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SMC = styled.View`
  width: 200px;
  height: 250px;
  background-color: ${backColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  border-radius: 30px;
  border-top-right-radius: 0px;
  ${({smp}) => smp}
  padding: 25px;
  z-index: 1113;
`;

export default SubMenu;
