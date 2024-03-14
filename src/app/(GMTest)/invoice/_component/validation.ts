
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

  if (!data.number?.trim()) {
    errors.number = 'Client email is required';
  }
  if (!data.amount?.trim()) {
    errors.number = 'Client email is required';
  }
  if (!data.quantity?.trim()) {
    errors.quantity = 'Client email is required';
  }
  if (!data.unit?.trim()) {
    errors.unit = 'Client email is required';
  }
  if (!data?.dueDate) {
    errors.dueDate = 'Due date is required';
  }



  return errors;
};

export default validateForm;