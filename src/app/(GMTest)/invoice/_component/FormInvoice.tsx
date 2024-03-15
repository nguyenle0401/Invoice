import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import validateForm from './validation';
import { useRouter } from 'next/navigation';
import { FormErrors } from './FormInvoice.interface';
import CircularProgress from '@mui/material/CircularProgress';
import { InvoiceFormProps } from './InvoiceForm.interface';

const InvoiceForm: React.FC<InvoiceFormProps> = ({ formType, id }) => {
  const router = useRouter();
  const [items, setItems] = useState([{ quantity: '', unit: '', amount: '' }]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const generateUniqueId = (): string => {
    const timestamp = new Date().getTime().toString(36); // Convert timestamp to base36 string
    const randomNumber = Math.random().toString(36).substr(2, 5); // Generate random string
    return timestamp + randomNumber; // Combine timestamp and random number
  };

  const addNewItem = () => {
    setItems([...items, { quantity: '', unit: '', amount: '' }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  interface Item {
    quantity: number;
    unit: number;
    amount: number;
  }

  const handleItemChange = (index: number, key: keyof Item, value: string) => {
    const newItems = [...items];
    newItems[index][key] = String(parseFloat(value)); // Convert value to a string
    setItems(newItems);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formDataObject = {
      id: generateUniqueId(),
      invoiceNumber,
      clientName,
      clientEmail,
      dueDate,
      notes,
      items,
    };

    const errors = validateForm(formDataObject);
    if (Object.keys(errors).length === 0) {
      // If no validation errors, proceed with form submission
      const existingDataString = localStorage.getItem('formData');
      const existingData = existingDataString
        ? JSON.parse(existingDataString)
        : [];
      const newData = [...existingData, formDataObject];
      localStorage.setItem('formData', JSON.stringify(newData));
      router.push('/invoice');
      setLoading(false);
    } else {
      // If there are validation errors, set them in the component state
      setErrors(errors);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Create Invoice
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Invoice Number"
          fullWidth
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Client Name"
          fullWidth
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          error={!!errors.clientName}
          helperText={errors.clientName}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Client Email"
          fullWidth
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          error={!!errors.clientEmail}
          helperText={errors.clientEmail}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              max: '9999-12-31', // set maximum date allowed
            },
          }}
          error={!!errors.dueDate}
          helperText={errors.dueDate}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Notes"
          fullWidth
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Box>
      {items.map((item, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, 'quantity', e.target.value)
                }
                error={!!errors?.quantity}
                helperText={errors?.quantity}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Unit"
                fullWidth
                value={item.unit}
                onChange={(e) =>
                  handleItemChange(index, 'unit', e.target.value)
                }
                error={!!errors?.unit}
                helperText={errors?.unit}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={item.amount}
                onChange={(e) =>
                  handleItemChange(index, 'amount', e.target.value)
                }
                error={!!errors?.amount}
                helperText={errors?.amount}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeItem(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={addNewItem}>
          Add Item
        </Button>
      </Box>
      <Box>
        <Button type="submit" variant="contained" color="primary">
          Create Invoice
        </Button>
      </Box>
    </form>
  );
};

export default InvoiceForm;
