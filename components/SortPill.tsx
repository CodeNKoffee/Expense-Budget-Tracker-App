import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SortPillProps } from '@/types';
import { sortOptions } from '@/constants';

export default function SortPill({ onSort }: SortPillProps) {
  const [sortIndex, setSortIndex] = useState(0);

  const handlePress = () => {
    const nextIndex = (sortIndex + 1) % sortOptions.length;
    setSortIndex(nextIndex);
    onSort(nextIndex);
  };

  return (
    <TouchableOpacity
      className='bg-budget-tangerine rounded-full px-4 py-4 mb-4 flex flex-row justify-center items-center gap-2'
      onPress={handlePress}
    >
      <FontAwesomeIcon icon={sortOptions[sortIndex].icon} color='#FEFEFE' />
      <Text className='text-budget-snow text-center font-bold text-lg'>{sortOptions[sortIndex].label}</Text>
    </TouchableOpacity>
  );
}

