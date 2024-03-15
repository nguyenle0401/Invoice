export interface IEditForm {
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