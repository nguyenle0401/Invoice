export interface InvoiceForm {
  firstName: string;
  lastName: string;
  id?: number;
}
export interface FormErrors {
  id?: number;
  clientEmail?: string;
  clientName?: string;
  dueDate?: number;
  quantity?: string;
  unit?: number;
  amount?: number;
  number?: number;
  // Add other form fields as needed
}
export interface InvoiceFormData {
  id: number;
  clientEmail?: string;
  clientName?: string;
  dueDate?: string;
  quantity?: string;
  unit?: string;
  amount?: string;
  number?: string;
  status: 'Paid' | 'Canceled' | 'Overdue' | 'Unpaid' | 'Refunded';
  items: {
    quantity: string;
    unit: string;
    amount: string;
  }[];
}