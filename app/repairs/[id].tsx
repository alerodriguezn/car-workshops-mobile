import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import NewAppointmentForm from "@/components/workshop/NewAppointmentForm";
import { useAuthStore } from "@/store/auth-store";
import { useAppointmentsStore } from "@/store/appointments-store";
import { useEffect } from "react";

export default function RepairsPage() {
  const { id } = useLocalSearchParams();
  const clientId = useAuthStore((state) => state.clientId);
  const fetchRepairsByAppointmentId = useAppointmentsStore(
    (state) => state.fetchRepairsByAppointmentId
  );

  const approvedRepairs = useAppointmentsStore((state) => state.approveRepair);
  const repairs = useAppointmentsStore((state) => state.repairs);

  useEffect(() => {
    if (id) {
      fetchRepairsByAppointmentId(Number(id));
    }
  }, [id]);

  const handleAcceptRepair = async (repairId: number) => {
    await approvedRepairs(repairId);
    fetchRepairsByAppointmentId(Number(id));
  }

  if (!clientId) {
    return (
      <View className="h-full w-full flex justify-center items-center">
        <Text className="text-white text-xl font-bold">
          You Are Not Logged In
        </Text>
        <Pressable
          className="text-white text-lg bg-blue-600 rounded p-2 mt-2"
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text className="text-white">Login</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#030418]">
      <Text className="text-2xl text-white font-bold text-center">Repairs</Text>
      {repairs.length ? (
        repairs.map((repair) => (
          <View className="p-4 bg-[#1F1F1F] rounded-lg my-2" key={repair.id}>
            <Text
              className={`text-amber-400 text-lg font-semibold underline mb-2`}
            >
              {repair.repairStatus}
            </Text>
            <Text className="text-gray-500 text-sm font-bold mb-2">
              {repair.isRequired ? "Repair Required 🚨" : "No Repair Required"}
            </Text>

            <Text className="text-blue-500 text-sm font-bold mb-2">
              Cost: ${repair.repairsDetail.cost}
            </Text>
            <Text className="text-gray-500 text-sm font-bold mb-2">
              Diagnosis : {repair.diagnosis}
            </Text>

            <Image
              source={{ uri: repair.initialStateImage }}
              style={{ width: 200, height: 200 }}
              className="rounded-lg mr-4 w-[65%] "
            />

            {repair.repairStatus === "Pending" && (
              <Pressable
                className="w-full bg-blue-600 rounded-lg h-8 mt-2"
                onPress={() => handleAcceptRepair(repair.id)}
              >
                <Text className="text-white text-center font-bold p-2">
                  Accept Repair
                </Text>
              </Pressable>
            )}
          </View>
        ))
      ) : (
        <Text>No Repairs</Text>
      )}
    </ScrollView>
  );
}
