import { useAuthStore } from "@/store/auth-store";
import { router } from "expo-router";
import { View, Text, Pressable, ScrollView, RefreshControl } from "react-native";
import { useAppointmentsStore } from "@/store/appointments-store";
import { useEffect } from "react";
import React from "react";

const statusColor = {
  Pending: "text-yellow-500",
  Created: "text-blue-500",
  Approved: "text-green-500",
};

export default function App() {


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    fetchAppointments(clientId);

  }, []);




  const clientId = useAuthStore((state) => state.clientId);
  const fetchAppointments = useAppointmentsStore(
    (state) => state.fetchAppointmentByClientId
  );
  const appointments = useAppointmentsStore((state) => state.appointments);
  const approveAppointment = useAppointmentsStore(
    (state) => state.approveAppointment
  );

  useEffect(() => {
    if (clientId) {
      fetchAppointments(clientId);
    }
  }, [clientId]);


  const handleAcceptAppointment = async (appointmentId: number) => {
    await approveAppointment(appointmentId);
    fetchAppointments(clientId);
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
    <ScrollView className="flex-1 bg-[#030418]"

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <Text className="text-2xl text-white font-bold text-center">
        Appointments
      </Text>
      {appointments.length > 0 ? (
        <View className="flex-1">
          {appointments.map((appointment) => (
            <View
              className="p-4 bg-[#1F1F1F] rounded-lg my-2"
              key={appointment.id}
            >
              <Text
                className={`text-amber-400 text-lg font-semibold underline`}
              >
                {appointment.status}
              </Text>
              <Text className="text-gray-500 text-sm font-bold">
                {appointment.date
                  ? new Date(appointment.date).toDateString()
                  : "The workshop has not proposed a date yet."}
              </Text>
              <Text className="text-gray-500 text-sm font-bold">
                Workshop ID : {appointment.workshopId}
              </Text>
              <Text className="text-gray-500 text-sm">
                Problem: {appointment.appointmentDetail.description}
              </Text>
              {appointment.status === "Approved" && (
                <Pressable className="w-full bg-green-600 rounded-lg h-8 mt-2" onPress={
                  () => {
                    router.push(`/repairs/${appointment.id}`);
                  }
                
                }>
                  <Text className="text-white text-center font-bold p-2">
                    View Details
                  </Text>
                </Pressable>
              )}
              {appointment.status === "Created" && (
                <Pressable className="w-full bg-sky-600 rounded-lg h-8 mt-2" onPress={() => handleAcceptAppointment(appointment.id)}>
                  <Text className="text-white text-center font-bold p-2">
                    Accept Appointment
                  </Text>
                </Pressable>
              )}

              {appointment.status === "Completed" && (
                <Pressable className="w-full bg-yellow-600 rounded-lg h-8 mt-2" onPress={() => router.push(`/payment/${appointment.id}`)}>
                  <Text className="text-white text-center font-bold p-2">
                  View Invoice
                  </Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View className="h-full w-full flex justify-center items-center">
          <Text className="text-white text-xl font-bold">
            No Appointments Found
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
