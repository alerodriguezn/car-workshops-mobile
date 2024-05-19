import { ScrollView, Text, View, Image } from "react-native";
import { useWorkshopStore } from "@/store/workshop-store";
import { useEffect, useState } from "react";
import { Workshop } from "@/interfaces/workshop";
import {WorkshopList} from '@/components/workshop/WorkshopCard'


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
            <WorkshopList data={workshops} title={"List of workshops"}/>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
