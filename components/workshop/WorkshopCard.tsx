import React from "react";
import { View, Text } from "../Themed";
import { router } from "expo-router";
import {Workshop} from '@/interfaces/workshop'
import { Image , Dimensions, Pressable } from "react-native";

interface WorkshopListProps {
    data: Workshop[];
    title: String;
}

let { width, height } = Dimensions.get("window");

export const WorkshopList = ({ data, title }: WorkshopListProps) => {
    return (
      <View className="mb-8 flex  bg-transparent">
        <Text className="text-white text-xl mx-4 mb-5 mt-3 font-bold text-left">{ title }</Text>
        
  
          <View className="flex-1 bg-[#030418] ">
            {data?.map((item, index) => (
              <View key={index} style={{ width: width , display: "flex", justifyContent: "center", alignItems: "center",  backgroundColor: 'transparent'}}>
                  
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
      
      router.push(`/`);
      
    }
  
    return (
      <Pressable onPress={handlePress}>
        {
          item.imageUrl ? (
            <Image
                source={{ uri: "http://192.168.1.29:3000"+item.imageUrl }}
                style={{ width: 200, height: 200 }}
                className="rounded-lg"
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
  
          )
        }
        <Text>{item.name}</Text>
        <Text>{item.location}</Text>
  
      </Pressable>
    );
  };

