export interface InvoiceObj {
    invoice: Invoice;
}


export interface Invoice {
    id:            number;
    total:         number;
    idAppointment: number;
    status :       string;
    invoiceDetail: InvoiceDetail[];
}

export interface InvoiceDetail {
    repairDetail: RepairDetail;
}

export interface RepairDetail {
    id:          number;
    description: string;
    cost:        number;
}
