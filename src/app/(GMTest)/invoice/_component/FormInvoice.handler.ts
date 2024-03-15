import { Resolver } from "react-hook-form";
import { IEditForm } from "./FormInvoice.interface";

export const resolver: Resolver<IEditForm> = async (values: IEditForm) => {
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
