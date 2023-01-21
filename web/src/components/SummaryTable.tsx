import dayjs from 'dayjs';
import React from 'react';
import { api } from '../lib/axios';
import { generateDatesYear } from '../utils/functions';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDate = generateDatesYear();

const minDates = 18 * 7;
const fillDates = minDates - summaryDate.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
};

export function SummaryTable() {
  const [summary, setSummary] = React.useState<Summary[]>([]);

  React.useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDate.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day');
            });

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}

        {fillDates > 0 &&
          Array.from({ length: fillDates }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
}
