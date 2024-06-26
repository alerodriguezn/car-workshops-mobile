import { ScrollView, Text, View, Image } from "react-native";
import { useWorkshopStore } from "@/store/workshop-store";
import { useEffect, useState } from "react";
import { Workshop } from "@/interfaces/workshop";
import {WorkshopList} from '@/components/workshop/WorkshopCard'
import { useAuthStore } from "@/store/auth-store";


export default function TabOneScreen() {
  const fetchWorkshops = useWorkshopStore((state) => state.fetchWorkshops);
  const workshops = useWorkshopStore((state) => state.workshops);
  const status = useWorkshopStore((state) => state.status);
  const auth = useAuthStore((state) => state.clientId);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return (
    <View className="flex-1 bg-[#030418]">
      <Text className="text-center text-3xl text-white font-bold">Workshops</Text>
      <Text className="text-white">id: {auth ? auth : "No Login"}</Text>
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
