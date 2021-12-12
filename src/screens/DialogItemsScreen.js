import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {backColor, colorFont} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DialogItem} from '../components';
import {format} from 'date-fns';
import Swipeable from 'react-native-swipeable';
import {
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {connect, useDispatch, useStore} from 'react-redux';
import {
  deleteDialogById,
  getAllDialog,
  setAllDialogs,
  setCurrentDialog,
  setCurrentPartnerId,
} from '../actions/dialog';
import {detectPartnerId} from '../utils/detecionUtil';

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

const DialogItemsView = ({navigation}) => {
  const store = useStore();
  const dispatch = useDispatch();

  const textInputRef = useRef(null);
  const [SIlist, setSIlist] = useState(store.getState().dialog.allDialogs);
  const [refreshing, setRefreshing] = useState(false);

  const DIlist = store.getState().dialog.allDialogs;

  React.useEffect(() => {
    dispatch(getAllDialog(store.getState().user.token));
  }, []);

  const DialogItemHandler = item => {
    let partnerId =
      item.authors[detectPartnerId(item.authors, store.getState().user.userId)]
        .user._id;
    dispatch(setCurrentDialog(item._id));
    dispatch(setCurrentPartnerId(partnerId));
    navigation.navigate('ChatRoom');
  };

  const onFindUserHandler = () => {
    navigation.navigate('FindUser');
  };

  const onRefreshHandler = () => {
    dispatch(getAllDialog(store.getState().user.token));
  };

  const onTextChangeHandler = textValue => {
    if (textValue === '') {
      dispatch(setAllDialogs(SIlist));
    } else {
      dispatch(
        setAllDialogs(
          SIlist.filter(item =>
            item.authors[
              detectPartnerId(item.authors, store.getState().user.userId)
            ].user.username
              .toLowerCase()
              .trim()
              .includes(textValue.toLowerCase().trim()),
          ),
        ),
      );
    }
  };

  const deleteDialogHandler = item => {
    dispatch(deleteDialogById(item._id, store.getState().user.token));
  };

  return (
    <DIWrapper>
      <DIContainer
        refreshControl={
          <RefreshControl
            onRefresh={onRefreshHandler}
            refreshing={refreshing}
            color={backColor}
          />
        }>
        {store.getState().dialog.isLoading && (
          <ActivityIndicator
            style={{
              marginTop: '80%',
            }}
            size="large"
            color={colorFont}
          />
        )}
        {!store.getState().dialog.isLoading && (
          <>
            {DIlist.length === 0 && (
              <DIEC>
                <Icon name="drafts" color={colorFont} size={250} />
                <ET>Список діалогів пустий ...</ET>
              </DIEC>
            )}
            {DIlist.length !== 0 &&
              DIlist.map((item, index) => (
                <Swipeable
                  key={index * 122}
                  rightButtonWidth={200}
                  rightButtons={[
                    <TouchableOpacity
                      onPress={() => deleteDialogHandler(item)}
                      activeOpacity={0.5}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: '13%',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ED9E9E',
                      }}>
                      <Icon
                        name="delete-forever"
                        size={90}
                        color="rgba(255 , 255 , 255 , .75)"
                      />
                    </TouchableOpacity>,
                  ]}>
                  <DialogItem
                    onPress={() => DialogItemHandler(item)}
                    dialogItemInfo={item}
                    key={index * 11}
                  />
                </Swipeable>
              ))}
          </>
        )}
      </DIContainer>

      <SContainer>
        <ISearch
          onPress={() => {
            textInputRef.current.focus();
          }}>
          <Icon size={40} color="white" name="search" />
        </ISearch>
        <SInput
          onChangeText={onTextChangeHandler}
          ref={textInputRef}
          clearTextOnFocus
          placeholder="Пошук діалогу ..."
        />
      </SContainer>
      <ADC onPress={onFindUserHandler}>
        <Icon color={colorFont} name="add-circle" size={100} />
      </ADC>
    </DIWrapper>
  );
};

const ET = styled.Text`
  font-size: 24px;
  width: 90%;
  text-align: center;
  letter-spacing: 2px;
  color: ${colorFont};
  font-weight: 700;
`;

const DIEC = styled.View`
  height: 90%;
  display: flex;
  flex-direction: column;
  padding-top: 30%;
  align-items: center;
  justify-conent: center;
`;

const ADC = styled.TouchableOpacity`
  position: absolute;
  bottom: 11%;
  right: 2%;
`;

const ISearch = styled.TouchableOpacity``;

const SInput = styled.TextInput`
  width: 85%;
  background-color: #fcfcfc;
  font-size: 20px;
  font-weight: 500;
  padding-left: 15px;
  padding-right: 15px;
  color: ${colorFont};
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  letter-spacing: 2px;
`;

const SContainer = styled.View`
  width: 100%;
  background-color: ${backColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 15px;
`;

const DIWrapper = styled.View`
  height: 100%;
  width: 100%;
  background-color: white;
  position: relative;
`;

const DIContainer = styled.ScrollView`
  width: 100%;
`;

const DialogItemsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialogItemsView);

export default DialogItemsScreen;
