import { useRoute } from "@react-navigation/native";
import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { HabitsEmpty } from "../components/HabitsEmpty";
import { Loading } from "../components/Loading";
import { ProgressBar } from "../components/ProgressBar";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;
  const [loading, setLoading] = React.useState(true);
  const [dayInfo, setDayInfo] = React.useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = React.useState<string[]>([]);

  const parsedDate = dayjs(date);
  const isPastDay = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", {
        params: { date },
      });

      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (err) {
      console.log(err);
      Alert.alert("Ops", "Não foi possível carregar as informações do hábito");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prev) => prev.filter((habit) => habit !== habitId));
      } else {
        setCompletedHabits((prev) => [...prev, habitId]);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Ops", "Não foi possivel editar o status do hábito");
    }
  }

  React.useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton></BackButton>

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitProgress} />

        <View
          className={clsx("mt-6", {
            ["opacity-50"]: isPastDay,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isPastDay}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}

          {isPastDay && (
            <Text className="text-white mt-10 text-center">
              Você não pode editar um hábito em uma data passada.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
