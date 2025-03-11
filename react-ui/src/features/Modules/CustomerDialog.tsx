import { Customer } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import formatDate from "@/utils/timeConvert";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import CustomerRental from "./CustomerRental";
import EditAddCustomer from "./EditAddCustomer";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteCustomer from "./DeleteCustomer";

interface CustomerDialogProps {
  customer: Customer;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[] | null>>;
}

const CustomerDialog = ({ customer, setCustomers }: CustomerDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {customer?.first_name + " " + customer?.last_name}
        </DialogTitle>
        <DialogDescription>
          <div className="text-sm py-3">
            <div className="font-semibold py-1">
              Customer ID:{" "}
              <span className="font-normal">{customer?.customer_id}</span>
            </div>
            <div className="font-semibold py-1">
              Email: <span className="font-normal">{customer?.email}</span>
            </div>
            <div className="font-semibold py-1">
              Address: <span className="font-normal"> {customer?.address}</span>
            </div>
            <div className="font-semibold py-1">
              Create Date:{" "}
              <span className="font-normal">
                {formatDate(customer?.create_date ?? "")}
              </span>
            </div>
            <div className="font-semibold py-1">
              Active:{" "}
              <span className="font-normal">
                {customer?.active === 0 ? "No" : "Yes"}
              </span>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-between items-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Rental History</Button>
          </DrawerTrigger>
          <CustomerRental customer_id={customer?.customer_id} />
        </Drawer>
        <div className="space-x-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <DeleteCustomer customer={customer} setCustomers={setCustomers} />
          </AlertDialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>
            <EditAddCustomer customer={customer} setCustomers={setCustomers} />
          </Dialog>
        </div>
      </div>
    </DialogContent>
  );
};

export default CustomerDialog;
