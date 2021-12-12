import React, {useState} from 'react';
import styled from 'styled-components';
import {ChatHeader, FooterChat, Message} from '../components';
import {backColor, colorFont, dateColor} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MockMessage} from '../api/mock';
import DocumentPicker from 'react-native-document-picker';
import {connect, useStore} from 'react-redux';
import axios from 'axios';
import {LINK_GET_USER_AVATAR} from '../constants/links';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

const ChatRoomScreenView = ({navigation}) => {
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [smp, setSmp] = useState('bottom: 51%; right: 10%;');
  const [messages, setMessages] = useState([]);
  const [msgText, setMsgText] = useState('');
  const [partnerAvatar, setPartnerAvatar] = useState({
    uri: 'https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg',
  });

  const store = useStore();
  const socketIO = store.getState().socketIO.socketIO;

  React.useEffect(() => {
    async function fetchAvatar() {
      const {data} = await axios
        .post(
          LINK_GET_USER_AVATAR,
          {userId: store.getState().dialog.currentPartner},
          {headers: {Authorization: store.getState().user.token}},
        )
        .catch(err => alert(ERROR_INTERNET_CONNECTION));
      setPartnerAvatar(data);
    }

    socketIO.emit('sd', {dialogId: store.getState().dialog.currentDialog});

    socketIO.emit('gam', {dialogId: store.getState().dialog.currentDialog});

    fetchAvatar();
  }, []);

  socketIO.on('giam', allMessages => {
    setMessages(allMessages);
  });

  socketIO.on('anm', newMessage => {
    console.log(newMessage);
    setMessages([...messages, newMessage]);
  });

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
    {
      iconName: 'not-listed-location',
      type: null,
      picker: () => {
        alert('Map picker is clicked!');
      },
    },
  ];

  const FilePicker = async type => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types[type]],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('User cancaled!');
      } else {
        throw err;
      }
    }
  };

  const onSubMenuHandler = () => {
    setIsSubMenu(!isSubMenu);
  };

  const onFocusHandler = () => {
    setSmp('top: 17%;right: 10%;');
  };

  const onBlurHandler = () => {
    setSmp('bottom: 51%; right: 10%;');
  };

  const onClose = () => {
    setIsSubMenu(false);
  };

  const onPressHandler = () => {
    socketIO.emit('gnm', {
      authorId: store.getState().user.userId,
      dialogId: store.getState().dialog.currentDialog,
      textContent: msgText,
      readed: false,
      isAudio: false,
      isImage: false,
      isDocument: false,
      documentContent: [],
      audioContent: [],
      imageContent: [],
    });

    setMsgText('');
  };

  return (
    <CRContainer>
      {isSubMenu && (
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
      )}

      <ChatHeader
        name={'Петро Петров Петровиcdscscscscч'}
        image={partnerAvatar}
        onPress={onSubMenuHandler}
      />

      <CMC>
        {messages.length === 0 && (
          <EMC>
            <Icon
              style={{position: 'absolute', top: '2%', left: '70%'}}
              name="message"
              color={dateColor}
              size={100}
            />
            <Icon
              style={{position: 'absolute', top: '-4%', left: '0%'}}
              name="mode-comment"
              color={dateColor}
              size={130}
            />
            <Icon name="group" size={300} color={colorFont} />
          </EMC>
        )}
        {messages.length > 0 &&
          messages.map((item, index) => (
            <Message key={index * 89} avatarURI={partnerAvatar} {...item} />
          ))}
      </CMC>

      <FooterChat
        onPressHandler={onPressHandler}
        onBlurHandler={onBlurHandler}
        onFocusHandler={onFocusHandler}
        msgText={msgText}
        setMsgText={setMsgText}
      />
    </CRContainer>
  );
};

const EMC = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 100px;
`;

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

const CMC = styled.ScrollView`
  padding-right: 23px;
  padding-left: 20px;
  margin-bottom: 16px;
`;

const CRContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChatRoomScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatRoomScreenView);

export default ChatRoomScreen;
