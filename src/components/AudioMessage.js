import React, {useState} from 'react';
import styled from 'styled-components';
import {colorFont, errorColor} from '../constants/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import {Alert} from 'react-native';
import {ERROR_AUDIO} from '../constants/error';

const MessageAudio = ({name}) => {
  const [playing, setPlayiyng] = useState(false);
  const [sd, setSound] = useState(null);
  const [width, setWidth] = useState(0);
  const [pause, setPause] = useState(false);
  const [interval, setInt] = useState(null);

  const onSoundPlay = () => {
    if (playing) {
      if (sd.isPlaying()) {
        setPause(true);
        sd.pause();
      } else {
        setPause(false);

        sd.play(s => {
          if (s) {
            setWidth(0);
            setPlayiyng(false);
            setPause(false);
            clearInterval(interval);
          }
        });
      }
    } else {
      let sound = new Sound(name.uri, Sound.MAIN_BUNDLE, err => {
        if (err) {
          Alert.alert('Помилка відтворення!', ERROR_AUDIO, [
            {
              text: 'Зрозуміло',
            },
          ]);
        }

        setSound(sound);
        setPlayiyng(true);

        let playInterval = setInterval(() => {
          sound.getCurrentTime(currentTime =>
            setWidth((currentTime / sound.getDuration()) * 100),
          );
        }, 1000);

        setInt(playInterval);
        sound.setVolume(1);
        sound.play(success => {
          if (success) {
            clearInterval(playInterval);
            setPlayiyng(false);
            setWidth(0);
          }
        });
      });
    }
  };

  return (
    <MAW onPress={onSoundPlay}>
      <MACW>
        <EC width={width}></EC>
        <MAC>
          <IC playing={playing}>
            {playing && (
              <>
                {pause && <Icon name="pause" color={'white'} size={35} />}
                {!pause && <Icon name="play-arrow" color={'white'} size={35} />}
              </>
            )}
            {!playing && <Icon name="audiotrack" color={'white'} size={25} />}
          </IC>
          <AN numberOfLines={1} ellipsizeMode="tail">
            {name.uri.split('/').pop()}
          </AN>
        </MAC>
      </MACW>
    </MAW>
  );
};

const MACW = styled.View`
  overflow: hidden;
  width: 200px;
`;

const EC = styled.View`
  width: ${({width}) => width}%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 4;
  border-radius: 30px;
`;

const AN = styled.Text`
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 700;
  width: 60%;
`;

const IC = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: ${({playing}) => (playing ? errorColor : colorFont)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  z-index: 7;
`;

const MAC = styled.View`
  background-color: white;
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 30px;
  position: relative;
`;

const MAW = styled.TouchableOpacity``;

export default MessageAudio;
