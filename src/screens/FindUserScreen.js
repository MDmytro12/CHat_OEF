import React, {useState} from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {backColor, colorFont} from '../constants/style';
import {Button, LogoTitle, SearchUser, TextInput} from '../components';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect, useDispatch, useStore} from 'react-redux';
import {searchUserById} from '../actions/search';
import {ERROR_MY_ID} from '../constants/error';

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

const mapStateToProps = state => {
  return {
    isLoading: state.search.isLoading,
    isLoadingDialog: state.dialog.isLoading,
  };
};

const FindUserScreenView = ({navigation, isLoadingDialog}) => {
  const store = useStore();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('61ad2ce378d568b7625785ca');

  const onSearchHadler = () => {
    if (store.getState().user.userId !== searchText) {
      dispatch(
        searchUserById(
          searchText,
          store.getState().user.userId,
          store.getState().user.token,
        ),
      );
    } else alert(ERROR_MY_ID);
  };

  return (
    <FUC>
      <LogoTitle />
      {isLoadingDialog && (
        <ActivityContainer>
          <ActivityIndicator color={colorFont} size="large" />
        </ActivityContainer>
      )}
      {!isLoadingDialog && (
        <CIC>
          <Icon color={colorFont} name="perm-identity" size={100} />
          <TextInput
            value={searchText}
            onChangeText={txt => setSearchText(txt)}
            placeholder={'Введи id користувача чату ...'}
          />
          {!store.getState().search.isLoading && (
            <Button
              onPress={onSearchHadler}
              buttonStyle={{width: '100%'}}
              iconName="search">
              <Text>Пошук</Text>
            </Button>
          )}
          {store.getState().search.isLoading && (
            <>
              <ActivityIndicator
                style={{paddingTop: 10}}
                color={colorFont}
                size="large"
              />
            </>
          )}
          {!store.getState().search.isLoading && (
            <>
              {store.getState().search.searchedList.length > 0 && (
                <RSC
                  contentContainerStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '90%',
                  }}>
                  {store.getState().search.searchedList.map((item, index) => (
                    <SearchUser
                      navigation={navigation}
                      key={index * 45}
                      {...item}
                    />
                  ))}
                </RSC>
              )}
              {store.getState().search.searchedList.length === 0 && (
                <EmptyList>Список пустий!</EmptyList>
              )}
            </>
          )}
        </CIC>
      )}
    </FUC>
  );
};

const ActivityContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
`;

const EmptyList = styled.Text`
  color: ${colorFont};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  padding-top: 30px;
`;

const CIC = styled.View`
  display: flex;
  flex-directoin: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 70%;
  padding-top: 70px;
`;

const RSC = styled.ScrollView`
  height: 120px;
`;

const FUC = styled.ScrollView`
  display: flex;
  flex-directoin: column;
  background-color: ${backColor};
  height: 100%;
  width: 100%;
`;

const FindUserScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindUserScreenView);

export default FindUserScreen;
