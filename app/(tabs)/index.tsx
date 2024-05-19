import { ScrollView, Text, View, Image } from "react-native";
import { useWorkshopStore } from "@/store/workshop-store";
import { useEffect, useState } from "react";
import { Workshop } from "@/interfaces/workshop";


export default function TabOneScreen() {
  const fetchWorkshops = useWorkshopStore((state) => state.fetchWorkshops);
  const workshops = useWorkshopStore((state) => state.workshops);
  const status = useWorkshopStore((state) => state.status);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return (
    <View className=" bg-white">
      <Text className="text-center text-3xl">Workshops</Text>
      <View className="">
        {status === "loading" && (
          <Text className="text-center">Loading...</Text>
        )}
        {status === "success" && (
          <ScrollView>
            {/* Aqui lo mejor es crear un componente como WorkshopCard donde se muestre la Informacion */}
            {workshops.map((workshop) => (
              <View key={workshop.id}>
                <Image
                  source={{ uri: "http://192.168.1.29:3000"+workshop.imageUrl }}
                  style={{ width: 200, height: 200 }}
                  className="rounded-lg"
                / >
                <Text>{workshop.name}</Text>
                <Text>{workshop.location}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
