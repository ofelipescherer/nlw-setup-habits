import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import React from 'react';
import { api } from '../lib/axios';

type PopoverHabitDayProps = {
  date: Date;
  handleCompleted: (completed: number) => void;
};

interface HabitProp {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function PopoverHabitDay({
  date,
  handleCompleted,
}: PopoverHabitDayProps) {
  const [habitInfo, setHabitInfo] = React.useState<HabitProp>();

  React.useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then(response => {
        setHabitInfo(response.data);
      });
  }, []);

  const isDatePast = dayjs(date).endOf('day').isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitCompleted = habitInfo!.completedHabits.includes(habitId);
    let completedHabits: string[] = [];
    if (isHabitCompleted) {
      completedHabits = habitInfo!.completedHabits.filter(id => id !== habitId);
      setHabitInfo(prev => ({
        possibleHabits: prev!.possibleHabits,
        completedHabits,
      }));
    } else {
      completedHabits = [...habitInfo!.completedHabits, habitId];

      setHabitInfo(prev => ({
        possibleHabits: prev!.possibleHabits,
        completedHabits,
      }));
    }

    handleCompleted(completedHabits.length);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitInfo?.possibleHabits.map(habit => {
        return (
          <Checkbox.Root
            key={habit.id}
            checked={habitInfo.completedHabits.includes(habit.id)}
            disabled={isDatePast}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-violet-600">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
