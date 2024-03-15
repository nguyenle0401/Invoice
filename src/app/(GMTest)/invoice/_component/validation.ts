import { InvoiceFormData, FormErrors } from './types';

const validateForm = (data: InvoiceFormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.invoiceNumber?.trim()) {
    errors.invoiceNumber = 'Invoice number is required';
  }

  if (!data.clientName?.trim()) {
    errors.clientName = 'Client name is required';
  }
  
  if (!data.clientEmail?.trim()) {
    errors.clientEmail = 'Client email is required';
  }

  // if (!parseInt(data.amount) || parseInt(data.amount) <= 0) {
  //   errors.amount = 'Amount is required';
  // } 

  // if (!parseInt(data.quantity) || parseInt(data.quantity) <= 0) {
  //   errors.quantity = 'Quantity is required';
  // } 

  // if (!parseInt(data.unit)  || parseInt(data.unit) <= 0) {
  //   errors.unit = 'Unit is required';
  // }

  return errors;
};

export default validateForm;
