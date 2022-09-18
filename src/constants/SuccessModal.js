import React from 'react';
import { useEffect } from 'react';
import {View, Text, Modal, TouchableOpacity,Animated, StyleSheet, Button, Easing} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../screens/components/shared/colors/color';
import AntDesign from 'react-native-vector-icons/AntDesign';


const SuccessModal = ({
  isModalVisible,
  handleOnClose,
  handleRetry,
  handleHome,
  successMessage
}) => {
  const [isVisible, setIsVisible] = React.useState(isModalVisible);
  const shakeAnimation = React.useRef(new Animated.Value(0)).current;
//   console.log('isVisible', isVisible);
  useEffect (() => {
    shakeIt();
  }, [isModalVisible]);

  const shakeIt = () => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 1,
                duration: 50,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -1,
                duration: 50,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
        ])
    ).start();
}

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}>
      <View
        style={[styles.firstView]}>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '80%',
            borderRadius: 40,
            padding: 40,
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={handleOnClose}>
                <MaterialIcon
                name='close'
                color={COLORS.primary}
                size={30}
                />
            </TouchableOpacity>
            <Animated.View style={{ transform: [{
                rotate: shakeAnimation.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-0.1rad', '0.1rad'],
                }),
            }] }}>
                <AntDesign
                  name='checkcircle'
                 size={100}
                 style={{color:COLORS.primary}}
                />
            </Animated.View>
          <Text style={{fontSize: 18, color: '#171717',top:15}}>{successMessage}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
    firstView:{
        flex: 1,
        backgroundColor: '#171717' + '90',
        justifyContent: 'center',
        alignItems: 'center',
    }
})