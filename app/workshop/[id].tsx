import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import NewAppointmentForm from "@/components/workshop/NewAppointmentForm";
import { useAuthStore } from "@/store/auth-store";

export default function WorkshopPage() {
  const { id } = useLocalSearchParams();
  const clientId = useAuthStore((state) => state.clientId);

  if (!clientId) {
    return (
      <View className="h-full w-full flex justify-center items-center">
        <Text className="text-white text-xl font-bold">You Are Not Logged In</Text>
        <Pressable className="text-white text-lg bg-blue-600 rounded p-2 mt-2" onPress={ () => {
            router.push("/login");
        }}>
            <Text className="text-white" >Login</Text>
        </Pressable>
      </View>
    );
  }

  return <NewAppointmentForm clientId={clientId} workshopId={Number(id)} />;
}
