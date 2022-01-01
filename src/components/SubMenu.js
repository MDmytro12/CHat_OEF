import React, {useState} from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {backColor, colorFont} from '../constants/style';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useStore} from 'react-redux';
import {
  disableAudioType,
  disableDocumentType,
  disableImgTyping,
  enableAudioType,
  enableDocumentType,
  enableImageTyping,
  setMsgAudio,
  setMsgDocument,
  setMsgImage,
} from '../actions/message';
import {hideSubMenu} from '../actions/dialog';
import {Alert} from 'react-native';

const SubMenu = ({}) => {
  const dispatch = useDispatch();
  const store = useStore();

  const image = store.getState().message.image;
  const doc = store.getState().message.document;
  const audio = store.getState().message.audio;

  const checkImage = () => {
    if (image !== {}) {
      dispatch(setMsgImage({}));

      if (store.getState().message.imageTyping) {
        dispatch(disableImgTyping());
      }
    }
  };

  const checkAudio = () => {
    if (audio !== {}) {
      dispatch(setMsgAudio({}));

      if (store.getState().message.audioTyping) {
        dispatch(disableAudioType());
      }
    }
  };

  const checkDocument = () => {
    if (doc !== {}) {
      dispatch(setMsgDocument({}));

      if (store.getState().message.documentTyping) {
        dispatch(disableDocumentType());
      }
    }
  };

  const FilePicker = async type => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types[type]],
      });

      switch (type) {
        case 'images':
          {
            checkAudio();
            checkDocument();

            dispatch(setMsgImage(res[0]));
            dispatch(enableImageTyping());
          }
          break;
        case 'pdf':
          {
            checkImage();
            checkAudio();

            dispatch(setMsgDocument(res[0]));
            dispatch(enableDocumentType());
          }
          break;
        case 'audio':
          {
            checkDocument();
            checkImage();

            dispatch(setMsgAudio(res[0]));
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
    <SMC>
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
  top: 11%;
  right: 13%;
  padding: 25px;
  z-index: 1113;
`;

export default SubMenu;
