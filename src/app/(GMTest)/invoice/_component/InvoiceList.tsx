import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import BaseCard from '@/app/(GMTest)/components/shared/BaseCard';
import Link from 'next/link';
import emailjs from 'emailjs-com';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import TablePagination from '@mui/material/TablePagination';

const InvoiceList = () => {
  interface InvoiceData {
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

  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceData[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    const storedInvoices = localStorage.getItem('formData');
    if (storedInvoices) {
      const parsedInvoices: InvoiceData[] = JSON.parse(storedInvoices);
      setInvoices(parsedInvoices);
    }
  }, []);

  const removeInvoice = (id: number) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoices);
    localStorage.setItem('formData', JSON.stringify(updatedInvoices));
  };

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setNameFilter(value);
    filterInvoices(value, statusFilter);
  };

  const handleStatusFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;
    setStatusFilter(value);
    filterInvoices(nameFilter, value);
  };

  const filterInvoices = (name: string, status: string) => {
    const filtered = invoices.filter(
      (invoice) =>
        invoice.clientName.toLowerCase().includes(name.toLowerCase()) &&
        (status === '' || invoice.status.toLowerCase() === status.toLowerCase())
    );
    setFilteredInvoices(filtered);
  };
  interface Invoice {
    clientEmail: string;
    clientName: string;
  }
  const sendEmail = async (invoice: Invoice) => {
    setLoading(true);
    try {
      await emailjs.send(
        'service_t2bhsca',
        'template_p2bfny6',
        {
          to_email: invoice?.clientEmail,
          to_name: invoice?.clientName,
          from_name: 'Gearment',
          message: 'This is your invoice. Please check it out!',
        },
        'BKvWbY7mfMbjqfEL9'
      );
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };
  const calculateTotalUnits = (invoice) => {
    let total = 0;
    invoice.forEach((item) => {
      total += parseFloat(item.amount);
    });
    return `$${total}`;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <BaseCard title="Invoice List">
      <TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <TextField
              label="Filter by Name"
              variant="outlined"
              value={nameFilter}
              onChange={handleNameFilterChange}
              sx={{ mr: 2 }}
            />
            <FormControl variant="outlined">
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Canceled">Canceled</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Link href="/invoice/create">
            <Button variant="contained" color="primary">
              Create Invoice
            </Button>
          </Link>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" align="center">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {invoices.length === 0 ? (
            <Typography variant="body1">No invoices available.</Typography>
          ) : (
            <TableBody>
              {invoices
                .filter((invoice) =>
                  invoice.clientName
                    ?.toLowerCase()
                    .includes(nameFilter.toLowerCase())
                )
                .filter(
                  (invoice) =>
                    statusFilter === '' ||
                    invoice.status === statusFilter ||
                    statusFilter === 'All Status'
                )
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell>{invoice.clientEmail}</TableCell>
                    <TableCell align="center">
                      <Chip
                        sx={{
                          pl: '4px',
                          pr: '4px',
                          backgroundColor: '#4caf50',
                          color: '#fff',
                        }}
                        size="small"
                        label="Paid"
                      />
                    </TableCell>
                    <TableCell>{calculateTotalUnits(invoice.items)}</TableCell>
                    <TableCell align="right">
                      <EmailIcon
                        color="primary"
                        onClick={() => sendEmail(invoice)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <DeleteIcon
                        color="error"
                        onClick={() => removeInvoice(invoice.id)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={invoices.length || filteredInvoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </BaseCard>
  );
};

export default InvoiceList;
