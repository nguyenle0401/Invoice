import { Resolver } from "react-hook-form";
import { InvoiceForm } from "./FormInvoice.interface";

export const resolver: Resolver<InvoiceForm> = async (values: InvoiceForm) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required."
          }
        }
      : {}
  };
};
