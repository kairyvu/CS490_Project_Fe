import { Customer } from "@/types";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import formatDate from "@/utils/timeConvert";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import CustomerRental from "./CustomerRental";

const CustomerDialog = (props: Customer) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props?.first_name + " " + props?.last_name}</DialogTitle>
        <DialogDescription>
          <div className="text-sm py-3">
            <div className="font-semibold py-1">
              Email: <span className="font-normal">{props?.email}</span>
            </div>
            <div className="font-semibold py-1">
              Address:
              <span className="font-normal"> {props?.address}</span>
            </div>
            <div className="font-semibold py-1">
              Create Date:
              <span className="font-normal">
                {formatDate(props?.create_date)}
              </span>
            </div>
            <div className="font-semibold py-1">
              Active:{" "}
              <span className="font-normal">
                {props?.active === 0 ? "No" : "Yes"}
              </span>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Rental History</Button>
        </DrawerTrigger>
        <CustomerRental customer_id={props?.customer_id} />
      </Drawer>
    </DialogContent>
  );
};

export default CustomerDialog;
