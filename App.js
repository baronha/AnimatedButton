import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  UIManager,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const JOIN = 'JOIN';
const JOINING = 'JOINING';
const JOINED = 'JOINED';

const COLOR = ['#835CF3', '#F8378C'];

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const animated = {
  type: LayoutAnimation.Types.easeInEaseOut,
  property: LayoutAnimation.Properties.opacity,
};

const LayoutEffect = () => {
  LayoutAnimation.configureNext({
    duration: 350,
    create: animated,
    update: animated,
    delete: animated,
  });
};

const App = () => {
  const [type, setType] = useState(JOIN);

  useEffect(() => {
    if (type === JOINING) {
      setTimeout(() => {
        LayoutEffect();
        setType(JOINED);
      }, 750);
    }
    return () => {
      clearTimeout();
    };
  }, [type]);

  const onPress = () => {
    LayoutEffect();
    switch (type) {
      case JOIN:
        return setType(JOINING);
      case JOINED:
        return setType(JOIN);
      default:
        setType(JOINING);
        break;
    }
  };

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={'#121212'} barStyle="light-content" />
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        {type === JOINED ? (
          <View style={style.button}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[style.text, style.joinedText]}>
              Joined
            </Text>
          </View>
        ) : (
          <LinearGradient
            style={style.button}
            start={{x: 1, y: 0.25}}
            end={{x: 0.75, y: 1.5}}
            colors={COLOR}>
            {type === JOINING ? (
              <Image
                key={JOINING}
                style={style.image}
                source={require('./image/check.png')}
              />
            ) : (
              <Text
                key={JOIN}
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[style.text, style.joinText]}>
                Join
              </Text>
            )}
          </LinearGradient>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  button: {
    width: 120,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 16,
  },
  joinText: {},
  joinedText: {
    color: '#ffffff92',
  },
  image: {
    width: 24,
    height: 24,
  },
});
