export interface Appointment {
  id: number;
  date: Date | null;
  status: string;
  clientId: number;
  vehicleId: number;
  workshopId: number;
  appointmentDetail: AppointmentDetail;
}

export interface AppointmentDetail {
  description: string;
  appointmentmedia: Appointmentmedia[];
}

export interface Appointmentmedia {
  id: number;
  appointmentDetailId: number;
  mediaUrl: string;
}
