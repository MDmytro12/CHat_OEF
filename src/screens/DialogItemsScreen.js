import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {backColor, colorFont} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DialogItem} from '../components';
import {format} from 'date-fns';
import Swipeable from 'react-native-swipeable';
import {RefreshControl, TouchableOpacity} from 'react-native';

const DialogItemInfo = [
  {
    user: {
      login: 'loginOfUser',
      fullname: 'Montgomery Deena Ada',
      imageUrl: require('../assets/img/anonym.png'),
      online: false,
    },
    message: {
      content:
        'Nostrud adipisicing nisi sunt ullamco adipisicing aute voluptate. Cupidatat irure sunt consequat cupidatat proident Lorem sint ipsum. Esse cillum excepteur id enim consectetur cupidatat nisi ad labore anim culpa ad duis aliquip. Culpa cupidatat pariatur officia quis ipsum dolor. Voluptate dolore exercitation sunt ullamco non enim commodo reprehenderit adipisicing excepteur labore. Mollit dolore nulla quis officia magna mollit incididunt. Aliquip nulla nisi officia proident eiusmod ea irure est mollit. Reprehenderit occaecat eiusmod nulla dolor laborum. Ut duis irure ipsum qui. Voluptate culpa velit nisi fugiat exercitation velit veniam et do. Fugiat laborum labore nostrud incididunt ea consequat. Enim nulla cupidatat eu sit labore adipisicing nostrud excepteur esse veniam do minim. Esse cupidatat amet et sunt qui. Irure nisi nisi quis magna ex adipisicing labore anim tempor ullamco laboris ipsum minim. Nisi eu veniam ea id laboris nostrud sint ad cillum et laboris labore excepteur. Aliqua aliquip magna eu amet est. Veniam non qui labore cupidatat incididunt culpa ea amet cupidatat. Excepteur non excepteur consectetur aliqua sint fugiat. Ex Lorem ad dolor laborum mollit quis. Cupidatat tempor duis eu Lorem ipsum dolor anim qui magna adipisicing et officia excepteur.',
      sendedAt: '06:53',
      readed: true,
    },
  },
  {
    user: {
      fullname: 'Rios Rosetta Sheryl',
      imageUrl: require('../assets/img/anonym.png'),
      online: true,
    },
    message: {
      content:
        'Sit magna mollit sint cupidatat cillum tempor ex eu in officia. Minim cillum sint non in. Elit sunt sint fugiat est aute dolor ipsum sit consequat elit. Exercitation magna ea do qui eiusmod veniam. Ut enim fugiat ea deserunt fugiat id commodo nisi eiusmod. Cillum veniam fugiat commodo consequat mollit velit consequat aliquip ullamco dolor. Est incididunt magna minim excepteur Lorem nisi eiusmod nisi ullamco. Dolore anim et sit aliquip excepteur proident nulla commodo reprehenderit adipisicing consequat magna et. Laboris laboris fugiat id velit magna laboris et cillum mollit sunt officia commodo. Tempor tempor eiusmod ullamco ex anim dolor. Magna duis voluptate officia magna ullamco nulla sit mollit cillum mollit deserunt reprehenderit occaecat. Labore commodo minim in voluptate. Laborum officia duis magna mollit tempor nisi. Nisi nulla fugiat ipsum tempor exercitation minim commodo. Dolor laborum Lorem dolor sint occaecat cupidatat. Excepteur sunt reprehenderit aliquip et consectetur incididunt aute magna ullamco magna adipisicing. Ea cupidatat sunt nostrud Lorem sunt. Amet eu nisi aliquip reprehenderit eu ipsum in sint ipsum voluptate reprehenderit sint qui amet. Irure ipsum esse fugiat proident ad qui eiusmod duis occaecat ipsum. Laborum Lorem et tempor labore enim tempor culpa ut consectetur do officia excepteur.',
      sendedAt: '09:43',
      readed: false,
    },
  },
  {
    user: {
      fullname: 'Jackson Gabriela Keith',
      imageUrl: require('../assets/img/anonym.png'),
      online: false,
    },
    message: {
      content:
        'In labore ad adipisicing eiusmod minim. Do ea nulla nostrud excepteur amet ipsum ad ullamco sint nisi commodo anim consectetur irure. Ad labore cupidatat elit consequat officia laborum velit esse aute irure non pariatur incididunt. Labore anim Lorem non sint quis aute minim proident veniam officia do. Et aliquip mollit ex aute. Magna nisi eu do dolore Lorem ipsum non qui. Veniam dolore aute nisi fugiat aliqua veniam eu aliquip qui cupidatat eu et nisi id. Qui proident ad sint occaecat tempor adipisicing aliquip mollit sit ullamco. Qui et in sunt laborum minim Lorem incididunt culpa. Nulla fugiat officia veniam deserunt adipisicing duis culpa. Cupidatat laboris ut eiusmod fugiat elit quis sint proident adipisicing velit ad quis. Ex laboris in enim cupidatat adipisicing commodo esse in excepteur. Ullamco nisi amet non nisi. Anim magna magna id sit et. Dolore do reprehenderit reprehenderit nulla adipisicing enim commodo cillum excepteur. Ipsum id deserunt nulla commodo pariatur. Cillum dolor et incididunt anim in labore labore velit sint nisi. Elit mollit id mollit non aute aliquip pariatur dolor aliqua dolore eiusmod. Mollit eu est amet eu laborum tempor quis excepteur. Nisi fugiat cillum incididunt elit reprehenderit do occaecat laborum quis qui laborum do sunt.',
      sendedAt: '07:23',
      readed: true,
    },
  },
  {
    user: {
      fullname: 'Kim Melinda Bridgett',
      imageUrl: require('../assets/img/anonym.png'),
      online: true,
    },
    message: {
      content:
        'Magna in veniam pariatur laboris eiusmod qui sit elit elit et. Laborum anim sit qui elit nisi aliqua tempor est eiusmod consequat qui ea est laborum. Quis quis consequat laborum cupidatat amet laborum anim culpa excepteur ad. Aliquip minim cupidatat elit laboris commodo minim. Velit amet culpa nostrud sit. Aliquip consectetur in exercitation nulla irure duis ipsum minim nisi. Id aute aliqua consectetur reprehenderit fugiat ex sint. Proident non est ex nisi id ipsum amet culpa ex nisi. Consectetur sit qui et fugiat. Dolor et ex veniam ea exercitation quis velit velit. Duis sunt reprehenderit enim minim anim deserunt id officia amet nostrud amet sint pariatur eu. Quis exercitation sint esse veniam aute et. Excepteur cupidatat laborum voluptate mollit elit adipisicing tempor fugiat ad. Aliqua ad ex quis ea sint adipisicing mollit cupidatat proident ipsum esse ipsum. Proident dolor ullamco anim in voluptate ipsum ex officia incididunt magna id. Culpa proident sunt nostrud exercitation veniam excepteur fugiat mollit exercitation occaecat aliquip culpa. Qui id reprehenderit qui fugiat ullamco. Consectetur non consequat reprehenderit do ad sint. Laboris aute elit irure excepteur deserunt reprehenderit est velit exercitation. Id cupidatat duis Lorem irure esse anim irure enim sint deserunt id ipsum ullamco.',
      sendedAt: '06:59',
      readed: true,
    },
  },
  {
    user: {
      fullname: 'Patton Pate Hendrix',
      imageUrl: require('../assets/img/anonym.png'),
      online: false,
    },
    message: {
      content:
        'Voluptate excepteur ipsum laboris adipisicing proident labore sint mollit aute minim commodo eu irure voluptate. Consequat tempor dolore sunt consectetur exercitation ullamco esse nisi non qui. Magna proident aute id dolor sunt excepteur et reprehenderit dolore. Adipisicing ex tempor enim et officia est quis. Incididunt et eu ipsum laboris do officia nostrud ea velit. Cillum est officia commodo id ex minim ea incididunt non ut. Ipsum magna esse id reprehenderit et dolor officia non. In quis ipsum ut nisi qui nulla. Adipisicing quis veniam laborum proident labore id aliquip commodo ad ipsum eu. Sunt nostrud exercitation exercitation consequat ea do officia aliquip. Sunt sunt sit id culpa cupidatat aute cillum. Quis nostrud veniam laboris et dolore excepteur culpa dolor et nisi consectetur amet aute irure. Ad cillum Lorem incididunt qui. Quis anim amet anim cillum. Exercitation culpa Lorem exercitation qui anim velit sint laborum cupidatat deserunt cupidatat. Voluptate adipisicing velit velit mollit. Ea voluptate id est deserunt aliquip ut amet excepteur consectetur. Et adipisicing ipsum velit occaecat fugiat. Pariatur dolore laboris cillum voluptate eiusmod. Eiusmod tempor aliqua reprehenderit esse ea.',
      sendedAt: '04:12',
      readed: true,
    },
  },
  {
    user: {
      fullname: 'Coffey Macdonald Chris',
      imageUrl: require('../assets/img/anonym.png'),
      online: true,
    },
    message: {
      content:
        'Reprehenderit sint nisi culpa anim fugiat eiusmod enim veniam laborum irure commodo. Consequat consectetur dolor fugiat ad irure commodo. Do fugiat consectetur excepteur ea fugiat sunt aliqua. Et occaecat quis qui incididunt aliqua dolore cupidatat dolor cupidatat culpa deserunt ex excepteur consequat. Duis dolor sint dolor anim culpa deserunt ullamco cupidatat aliqua qui pariatur deserunt. Anim proident sint eu cillum enim in do est laborum voluptate ipsum culpa. Adipisicing enim irure est ea labore in aute nostrud sit minim. Aute ipsum nostrud quis ullamco dolore cillum ullamco elit. Aute velit dolor eu mollit consectetur consectetur. Et cupidatat commodo exercitation consequat. Est ipsum et eu non consequat. Laborum consequat excepteur ipsum exercitation. Amet id sunt occaecat cupidatat reprehenderit eu minim. Eu fugiat excepteur velit ex nisi veniam sint. Excepteur commodo non eiusmod tempor ullamco sunt ea incididunt nostrud fugiat culpa ad. Nostrud do ipsum cillum velit amet sit ipsum eu magna amet non. Esse consectetur ipsum est do nulla aliquip irure commodo est dolore laborum ullamco sit. Aliqua sint minim in reprehenderit cillum enim sit magna minim in cupidatat adipisicing dolore. Lorem dolor aliquip incididunt dolor. Ad fugiat aliquip sint irure enim excepteur nostrud sit amet.',
      sendedAt: '06:35',
      readed: true,
    },
  },
  {
    user: {
      fullname: 'Knox Arline Angela',
      imageUrl: require('../assets/img/anonym.png'),
      online: true,
    },
    message: {
      content:
        'Qui ut sint sint magna laborum velit velit nulla fugiat. Quis aliqua non non fugiat pariatur non tempor deserunt sint officia ullamco ipsum occaecat. Veniam nulla exercitation enim velit anim eiusmod reprehenderit ut excepteur. Veniam enim minim cillum eu sunt adipisicing elit ea qui incididunt nisi consectetur. Esse anim est dolore eiusmod proident adipisicing. Eu occaecat irure amet nulla excepteur nostrud laborum cupidatat elit anim ea. Nisi id qui quis sint. Aliqua eiusmod labore enim proident fugiat dolor veniam commodo et. Lorem sint deserunt laborum consectetur irure aliquip sint. Fugiat duis voluptate aliquip dolore Lorem. Deserunt ipsum dolore voluptate proident amet nulla reprehenderit dolor aliquip. Non amet id anim commodo veniam dolore do fugiat in veniam. Laborum mollit ullamco laborum veniam ut occaecat aliquip proident amet. Veniam in id deserunt culpa amet est adipisicing sit. Eu veniam Lorem pariatur veniam deserunt nostrud cupidatat fugiat commodo ullamco ipsum nulla est. Cupidatat laborum cillum sint sunt fugiat cillum voluptate nostrud occaecat. Qui fugiat duis sunt sint incididunt irure tempor consequat veniam laboris magna eu mollit. Exercitation commodo ea commodo adipisicing. Dolore dolor nisi pariatur adipisicing quis. Magna ad do velit amet consectetur consectetur laborum amet dolore ipsum ad adipisicing.',
      sendedAt: '08:05',
      readed: false,
    },
  },
];

const DialogItemsScreen = ({navigation}) => {
  const textInputRef = useRef(null);
  const [DIlist, setDIlist] = useState(DialogItemInfo);
  const [SIlist, setSIlist] = useState(DialogItemInfo);
  const [refreshing, setRefreshing] = useState(false);

  const DialogItemHandler = loginData => {
    navigation.navigate('ChatRoom');
  };

  const onFindUserHandler = () => {
    navigation.navigate('FindUser');
  };

  const onRefreshHandler = () => {
    alert('Refresh!');
  };

  const onTextChangeHandler = textValue => {
    if (textValue === '') {
      setDIlist(SIlist);
    } else {
      setDIlist(
        SIlist.filter(item =>
          item.user.fullname
            .toLowerCase()
            .trim()
            .includes(textValue.toLowerCase().trim()),
        ),
      );
    }
  };

  return (
    <DIWrapper>
      {DIlist.length === 0 && (
        <DIEC>
          <Icon name="drafts" color={colorFont} size={250} />
          <ET>Список діалогів пустий ...</ET>
        </DIEC>
      )}
      {DIlist.length !== 0 && (
        <DIContainer
          refreshControl={
            <RefreshControl
              onRefresh={onRefreshHandler}
              refreshing={refreshing}
              color={backColor}
            />
          }>
          {DIlist.map((item, index) => (
            <Swipeable
              key={index * 122}
              rightButtonWidth={200}
              rightButtons={[
                <TouchableOpacity
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
              ]}
              onPress={() => {
                alert('He;llo');
              }}>
              <DialogItem
                onPress={() => DialogItemHandler(item.user.fullname)}
                dialogItemInfo={item}
                key={index * 11}
              />
            </Swipeable>
          ))}
        </DIContainer>
      )}

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

export default DialogItemsScreen;
