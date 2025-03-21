import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Customer } from "@/types";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface EditAddCustomerProps {
  customer?: Customer;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[] | null>>;
}

const EditAddCustomer = ({ customer, setCustomers }: EditAddCustomerProps) => {
  const isEditMode = !!customer;
  const [customerData, setCustomerData] = useState({
    customer_id: customer?.customer_id || 0,
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
    email: customer?.email || "",
    address: customer?.address || "",
    district: customer?.district || "",
    city: customer?.city || "",
    country: customer?.country || "",
    phone: customer?.phone || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/sakila_db/api/customers/"
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSubmit = async () => {
    if (isEditMode) {
      try {
        const response = await axios.put(
          "http://localhost:8000/sakila_db/api/update-customer/",
          customerData
        );
        console.log(response.data.message);
        setCustomers((prevCustomers) => {
          const customersList = prevCustomers || [];

          return customersList.map((cust) =>
            cust.customer_id === customerData.customer_id ? customerData : cust
          );
        });
        toast("Customer Updated Successfully", {
          description: "Your changes have been saved",
        });
      } catch (error) {
        console.error("Error Updating Customer: ", error);
        toast("Update Failed", {
          description: "Please Try Again",
        });
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/sakila_db/api/create-customer/",
          customerData
        );
        console.log(response.data.message);
        fetchCustomers();
        toast("Customer Added Successfully", {
          description: "New customer has been added",
        });
      } catch (error) {
        console.error("Error Adding Customer: ", error);

        let errorMessage = "An unexpected error occurred.";
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast("Add Failed", {
          description: errorMessage,
        });
      }
      setCustomerData({
        customer_id: 0,
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        district: "",
        city: "",
        country: "",
        phone: "",
      });
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogDescription>
          Make changes to customer profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="first_name" className="text-left">
            First Name
          </Label>
          <Input
            id="first_name"
            value={customerData.first_name}
            name="first_name"
            className="col-span-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="last_name" className="text-left">
            Last Name
          </Label>
          <Input
            id="last_name"
            value={customerData.last_name}
            name="last_name"
            className="col-span-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <Input
            id="email"
            value={customerData.email}
            name="email"
            className="col-span-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-left">
            Address
          </Label>
          <Input
            id="address"
            value={customerData.address}
            name="address"
            className="col-span-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="district" className="text-left">
            State/District
          </Label>
          <Input
            id="district"
            value={customerData.district}
            name="district"
            className="col-span-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="city" className="text-left">
            City
          </Label>
          <Input
            id="city"
            value={customerData.city}
            name="city"
            className="col-span-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="country" className="text-left">
            Country
          </Label>
          <Input
            id="country"
            value={customerData.country}
            name="country"
            className="col-span-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-left">
            Phone
          </Label>
          <Input
            id="phone"
            value={customerData.phone}
            name="phone"
            className="col-span-3"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="submit"
            disabled={
              customer?.first_name === customerData.first_name &&
              customer?.last_name === customerData.last_name &&
              customer?.email === customerData.email &&
              customer?.address === customerData.address &&
              customer?.district === customerData.district &&
              customer?.country === customerData.country &&
              customer?.city === customerData.city &&
              customer?.phone === customerData.phone
            }
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditAddCustomer;
