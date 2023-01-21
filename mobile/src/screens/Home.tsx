import { Text, View, ScrollView, Alert } from "react-native";

import { Header } from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { generateDays } from "../utils/functions";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { api } from "../lib/axios";
import React, { useCallback } from "react";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDays();
const minimunSummaryDatesSizes = 18 * 5;
const fillDates = minimunSummaryDatesSizes - datesFromYearStart.length;

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
};

export function Home() {
  const [loading, setLoading] = React.useState(true);
  const [summary, setSummary] = React.useState<SummaryProps[] | null>(null);
  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  React.useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithHabit = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });

              return (
                <HabitDay
                  onPress={() =>
                    navigate("habit", { date: date.toISOString() })
                  }
                  key={date.toISOString()}
                  date={date}
                  amountCompleted={dayWithHabit?.completed}
                  amountOfHabits={dayWithHabit?.amount}
                />
              );
            })}

            {fillDates > 0 &&
              Array.from({ length: fillDates }).map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
