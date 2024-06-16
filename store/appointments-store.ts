import { Appointment } from "@/interfaces/appointments";
import { create } from "zustand";
import axiosClient from "@/config/axiosClient";
import { Repair, RepairList } from "@/interfaces/repairs";
import { Invoice, InvoiceObj } from "@/interfaces/invoice";

export interface AppointmentList {
  appointments: Appointment[];
}

interface State {
  appointments: Appointment[];
  repairs: Repair[];
  invoice: Invoice;
  fetchAppointmentByClientId: (clientId: number) => void;
  fetchRepairsByAppointmentId: (appointmentId: number) => void;
  approveAppointment: (appointmentId: number) => void;
  approveRepair: (repairId: number) => void;
  fetchInvoiceByAppointmentId: (appointmentId: number) => void;
  payInvoice: (invoiceId: number) => void;
  status: "idle" | "loading" | "success" | "error";
}

export const useAppointmentsStore = create<State>()((set, get) => ({
  appointments: {} as Appointment[],
  repairs: {} as Repair[],
  status: "idle",
  invoice: {} as Invoice,
  fetchAppointmentByClientId: async (clientId) => {
    set({ status: "loading" });

    const response = await fetch(
      `http://192.168.1.29:3000/api/appointment?clientId=${clientId}`
    );
    const data = await response.json();

    console.log(data.appointments);

    set({ appointments: data.appointments });
    set({ status: "success" });
  },
  approveAppointment: async (appointmentId) => {
    const response = await axiosClient.put(
      `/appointment/confirm/${appointmentId}`
    );
    return response.data;
  },
  
  fetchRepairsByAppointmentId: async (appointmentId) => {
    set({ status: "loading" });

    const { data } = await axiosClient.get<RepairList>(`/repairs/${appointmentId}`)

    set({ repairs: data.repairs });
  },
  approveRepair: async (repairId) => {
    const response = await axiosClient.put(
      `/repairs/confirm/${repairId}`
    );
    return response.data;
  },
  fetchInvoiceByAppointmentId: async (appointmentId) => {
    const { data } = await axiosClient.get<InvoiceObj>(`/invoice/${appointmentId}`);
    set({ invoice: data.invoice });
    console.log("Print INVOICEEEE");
    console.log(data.invoice);
  },
  payInvoice: async (invoiceId) => {
    const response = await axiosClient.put(`/invoice/pay/${invoiceId}`);
    return response.data;
  },

}));
