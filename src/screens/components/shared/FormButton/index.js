import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import COLORS from '../colors/color';

const FormButton = ({
    labelText = '',
    handleOnPress = null,
    style,
    loading,
    isPrimary = true,
    ...more
}) => {
    return (
        <TouchableOpacity
            style={{
                paddingVertical: 10,
                backgroundColor: isPrimary ? COLORS.primary : COLORS.white,
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 5,
                ...style,
            }}
            activeOpacity={0.9}
            onPress={handleOnPress}
            {...more}>
             {loading ? (
                <ActivityIndicator
                    animating={loading}
                    size={'small'}
                    color={'white'}
                    style={{ alignSelf: 'center', }}
                />
            ):null} 
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: isPrimary ? COLORS.white : COLORS.primary,
                }}>
                {labelText}
            </Text>
        </TouchableOpacity>
    );
};

export default FormButton;