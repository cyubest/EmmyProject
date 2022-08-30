import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../shared/colors/color';

const ResultModal = ({
  isModalVisible,
  correctCount,
  incorrectCount,
  totalCount,
  handleOnClose,
  handleRetry,
  handleHome,
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black + '90',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '90%',
            borderRadius: 5,
            padding: 40,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 28, color: COLORS.black}}>Thank you for your Answers</Text>
          
          {/* Try agian */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              width: '100%',
              backgroundColor: COLORS.primary,
              marginTop: 20,
              borderRadius: 50,
            }}
            onPress={handleRetry}>
            <MaterialIcons name="replay" style={{color: COLORS.white}} />
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                marginLeft: 10,
              }}>
              Try Again
            </Text>
          </TouchableOpacity>
          {/* Go Home */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              width: '100%',
              backgroundColor: COLORS.primary + '20',
              marginTop: 20,
              borderRadius: 50,
            }}
            onPress={handleHome}>
            <MaterialIcons name="home" style={{color: COLORS.primary}} />
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.primary,
                marginLeft: 10,
              }}>
              Go Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;