import { Customer } from "@/types";
import axios from "axios";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteCustomerProps {
  customer: Customer;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[] | null>>;
}

const DeleteCustomer = ({ customer, setCustomers }: DeleteCustomerProps) => {
  const handleSubmit = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/sakila_db/api/delete-customer/${customer.customer_id}/`
      );
      console.log(response.data.message);
      setCustomers((prevCustomers) => {
        const customersList = prevCustomers || [];
        return customersList.filter(
          (cust) => cust.customer_id !== customer.customer_id
        );
      });
      toast("Customer Deleted Successfully", {
        description: "A Customer has been deleted",
      });
    } catch (error) {
      console.log(error);
      toast("Failed to delete", {
        description: "Please try again",
      });
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the
          customer account and remove all the data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteCustomer;
