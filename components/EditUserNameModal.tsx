import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { EditUserNameModalProps } from '@/types';

export default function EditUserNameModal({
  visible,
  inputValue,
  onInputChange,
  onSave,
  onCancel
}: EditUserNameModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className=" bg-budget-charcoal bg-opacity-50 flex-1 justify-center items-center">
        <View className="bg-white p-6 rounded-2xl w-72 flex flex-col items-center">
          <View className="w-full mb-4">
            <Text className="text-lg text-budget-charcoal font-bold mb-2">{t('editUsername.enterYourName')}</Text>
            <TextInput
              className="bg-white rounded-2xl border-4 border-budget-tangerine mb-4 px-4 py-2 text-center"
              value={inputValue}
              onChangeText={onInputChange}
            />
          </View>

          <View className="w-full flex flex-col-reverse justify-between items-center gap-4">
            <TouchableOpacity 
              className="bg-transparent border border-orange-500 rounded-2xl w-full p-4"
              onPress={onCancel} 
            >
              <Text className="text-orange-500 text-center font-bold">{t('editUsername.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-orange-500 rounded-2xl w-full p-4"
              onPress={onSave} 
            >
              <Text className="text-white text-center font-bold">{t('editUsername.save')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};