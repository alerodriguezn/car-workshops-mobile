export interface RepairList {
    repairs: Repair[];
}


export interface Repair {
    id:                number;
    appointmentId:     number;
    managerId:         number;
    diagnosis:         string;
    repairStatus:      string;
    isRequired:        boolean;
    initialStateImage: string;
    ApprovedByCliente: boolean;
    vehicleId:         number;
    repairsDetail:    RepairsDetail;
}



export interface RepairsDetail {
    id:          number;
    description: string;
    cost:        number;
}
