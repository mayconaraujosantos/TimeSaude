import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

export interface DateItem {
  date: Date;
  day: number;
  month: number;
  year: number;
  weekDay: string;
  isToday?: boolean;
}

interface DateSelectorProps {
  onDateSelect?: (date: DateItem) => void;
  initialSelectedDate?: Date;
  daysToShow?: number;
}

export function DateSelector({
  onDateSelect,
  initialSelectedDate = new Date(),
  daysToShow = 7,
}: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialSelectedDate);

  // Generate dates array starting from today
  const generateDates = (): DateItem[] => {
    const dates: DateItem[] = [];
    const today = new Date();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayIndex = date.getDay();

      dates.push({
        date,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        weekDay: weekDays[dayIndex] ?? 'Sun',
        isToday: i === 0,
      });
    }

    return dates;
  };

  const dates = generateDates();

  const handleDatePress = (dateItem: DateItem) => {
    setSelectedDate(dateItem.date);
    onDateSelect?.(dateItem);
  };

  const isSelected = (dateItem: DateItem) => {
    return (
      selectedDate.getDate() === dateItem.day &&
      selectedDate.getMonth() === dateItem.month &&
      selectedDate.getFullYear() === dateItem.year
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className='flex-row'
      contentContainerClassName='gap-2 px-6'
    >
      {dates.map((dateItem, index) => {
        const selected = isSelected(dateItem);

        return (
          <TouchableOpacity
            key={`${dateItem.year}-${dateItem.month}-${dateItem.day}-${index}`}
            onPress={() => handleDatePress(dateItem)}
            accessibilityRole='button'
            testID={`date-button-${index}`}
            className={`items-center justify-center py-4 px-5 rounded-full min-w-[70px] ${
              selected ? 'bg-primary' : 'bg-white border border-gray-200'
            }`}
          >
            <Text className={`text-2xl font-bold ${selected ? 'text-white' : 'text-gray-900'}`}>
              {dateItem.day}
            </Text>
            <Text className={`text-xs mt-1 ${selected ? 'text-white' : 'text-gray-500'}`}>
              {dateItem.weekDay}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
