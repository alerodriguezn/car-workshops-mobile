import { View, Text, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuthStore } from "@/store/auth-store";
import { useAppointmentsStore } from "@/store/appointments-store";
import { useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";

export default function PaymentPage() {
  
  const { id } = useLocalSearchParams();
  const fetchInvoice = useAppointmentsStore(
    (state) => state.fetchInvoiceByAppointmentId
  );
  const invoice = useAppointmentsStore((state) => state.invoice);
  const payInvoice = useAppointmentsStore((state) => state.payInvoice);

  useEffect(() => {
    if (id) {
      fetchInvoice(Number(id));
    }
  }, [id]);

  const handlePayInvoice = async (invoiceId: number) => {
    await payInvoice(invoiceId);
    fetchInvoice(Number(id));
  };

  console.log("asdasd");
  console.log(invoice);

  if (!invoice) {
    return (
      <View className="h-full w-full flex justify-center items-center">
        <Text className="text-white text-xl font-bold">No Invoice Found</Text>
      </View>
    );
  }
  return (
    <ScrollView className="flex-1">
      <View
        className={`${
          invoice.status === "Pending" ? "bg-red-500" : "bg-green-600"
        } rounded p-1 mt-2 flex flex-row justify-center items-center mb-2`}
      >
        <Entypo name="credit-card"  size={22} color="white" />
        <Text className={`text-white text-lg text-center font-bold ml-2`}>
          {invoice.status === "Pending" ? "Unpaid" : "Paid"}
        </Text>
      </View>
      <Text className="text-white text-2xl text-center font-bold">
        Invoice {invoice.idAppointment}
      </Text>



      {invoice.invoiceDetail ? (invoice.invoiceDetail.map((item) => {
        return (
          <View
            className="p-4 bg-[#1F1F1F] rounded-lg my-2 flex flex-row justify-between items-center"
            key={item.repairDetail.id}
          >
            <Text className="text-blue-400 text-lg font-semibold mb-2">
              ${item.repairDetail.cost}
            </Text>
            <Text className="text-gray-500 text-sm font-bold mb-2">
              {item.repairDetail.description}
            </Text>
          </View>
        );
      })) : (
        <Text className="text-white text-2xl text-center font-bold">
          No Invoice Details
        </Text>
      )}
      {/* Display Total */}
      <View>
        <Text className="text-white text-2xl text-center font-bold">
          Total: ${invoice.total}
        </Text>

        {invoice.status === "Pending" ? (
          <Pressable
            className="bg-green-600 p-2 rounded-lg mt-2"
            onPress={() => handlePayInvoice(invoice.id)}
          >
            <Text className="text-white text-xl text-center font-bold">
              Pay
            </Text>
          </Pressable>
        ) : (
          <View className="bg-slate-400 p-2 rounded-lg mt-2">
            <Text className="text-white text-xl text-center font-bold">
              Paid ✅
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
