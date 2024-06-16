import React from "react";
import { View, Text } from '../Themed';
import { router } from "expo-router";
import { Workshop } from "@/interfaces/workshop";
import { Image, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface WorkshopListProps {
  data: Workshop[];
  title: String;
}

let { width, height } = Dimensions.get("window");

export const WorkshopList = ({ data, title }: WorkshopListProps) => {
  return (
    <View className="mb-8 flex bg-[#030418]">
      <Text className="text-white text-xl mx-4 mb-5 mt-3 font-bold text-left">
        {title}
      </Text>

      <View className="flex-1 bg-[#030418] ">
        {data?.map((item, index) => (
          <View
            key={index}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <WorkshopCard item={item} />
          </View>
        ))}
      </View>
    </View>
  );
};

interface WorkshopCardProps {
  item: Workshop;
}

const WorkshopCard = ({ item }: WorkshopCardProps) => {
  const handlePress = () => {
    router.push(`/workshop/${item.id}`);
  };

  return (
    <Pressable onPress={handlePress} className="flex flex-row justify-center items-center mb-8 border-2 border-slate-800 px-2 py-2 rounded-lg">
      {item.imageUrl ? (
        <Image
          source={{ uri: "http://192.168.1.29:3000" + item.imageUrl }}
          style={{ width: 200, height: 200 }}
          className="rounded-lg mr-4 w-[65%] "
        />
      ) : (
        <View
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 20,
            backgroundColor: "gray",
          }}
        />
      )}
      <View className="bg-transparent w-[35%]">
        <Text className="font-bold mb-2 text-white">{item.name}</Text>
        <Text className="font-light mb-2 text-white">📍{item.location}</Text>
        <View className="flex flex-row justify-center items-center bg-transparent gap-2 mb-2">
          <MaterialCommunityIcons name="certificate-outline" size={18} color="white" className="" />
          <Text className="text-white">{item.speciality}</Text>
        </View>
        <Text className="font-light mb-2 text-white">⭐ {item.rating}</Text>
        
      </View>
      
    </Pressable>
  );
};
