import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const availableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function New() {
  const [weekDays, setWeekDays] = React.useState<number[]>([]);

  function handleWeekDays(index: number) {
    if (weekDays.includes(index)) {
      setWeekDays((prev) => prev.filter((weekDay) => weekDay !== index));
    } else {
      setWeekDays((prev) => [...prev, index]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton></BackButton>

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>
        <TextInput
          placeholder="Ex. exercícios, dormir bem, etc"
          placeholderTextColor={colors.zinc[400]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white  focus:border-green-600 border-2 border-zinc-800"
        ></TextInput>

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>
        {availableWeekDays.map((day, index) => (
          <Checkbox
            onPress={() => handleWeekDays(index)}
            checked={weekDays.includes(index)}
            key={day}
            title={day}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="font-semibold text-base text-white ml-2">
            Confimar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
