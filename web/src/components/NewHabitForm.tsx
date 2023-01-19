import { FormEvent } from 'react';
import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import React from 'react';
import { api } from '../lib/axios';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function NewHabitForm() {
  const [title, setTitle] = React.useState('');
  const [weekDays, setWeekDays] = React.useState<number[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title || weekDays.length === 0) return;
    else {
      await api.post('habits', {
        title,
        weekDays,
      });

      setTitle('');
      setWeekDays([]);
    }
  }

  function handleWeekDays(weekDayNumber: number) {
    if (weekDays.includes(weekDayNumber)) {
      const filtered = weekDays.filter(day => day !== weekDayNumber);
      setWeekDays(filtered);
    } else {
      const newArray = [...weekDays, weekDayNumber];
      setWeekDays(newArray);
    }
  }

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={handleSubmit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex. Exercícios, dormir bem, etc..."
        autoFocus
        value={title}
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="submit" className="font-semibold leading-tight m-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            className="flex items-center gap-3 group"
            onCheckedChange={() => handleWeekDays(index)}
            checked={weekDays.includes(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold"></Check>
        Confirmar
      </button>
    </form>
  );
}
