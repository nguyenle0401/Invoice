'use client';
import { Grid } from '@mui/material';
import EditForm from '../_component/FormInvoice';
import { useParams, usePathname } from 'next/navigation';
import { Actions } from '../_const';

export default function Page() {
  const pathname = usePathname();
  const params = useParams();
  const id = parseInt(params.subs?.[0]);
  const isNewItem = Number.isNaN(id);
  const detailAction = isNewItem
    ? Actions.create
    : Actions[params.subs?.[1] as keyof typeof Actions] || Actions.detail;
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        {detailAction === Actions.create ? (
          <EditForm formType={detailAction} />
        ) : null}
        {detailAction === Actions.edit ? (
          <EditForm id={id} formType={detailAction} />
        ) : null}
        {detailAction === Actions.detail ? 'detail page' : null}
      </Grid>
    </Grid>
  );
}
