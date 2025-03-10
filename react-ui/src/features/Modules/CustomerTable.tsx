import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Customer } from "@/types";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CustomerDialog from "./CustomerDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditAddCustomer from "@/features/Modules/EditAddCustomer";

interface CustomerTableProps {
  searchBy: string;
  searchValue: string;
}

const CustomerTable = ({ searchBy, searchValue }: CustomerTableProps) => {
  const rowsPerPage = 20;
  const [customers, setCustomers] = useState<Customer[] | null>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const filteredCustomers = useMemo(() => {
    setStartIndex(0);
    setEndIndex(rowsPerPage);
    if (!customers) return [];
    return customers.filter((customer) => {
      if (!searchValue.trim()) return true;

      if (searchBy === "Customer ID") {
        const searchId = Number(searchValue);

        return !isNaN(searchId) && customer.customer_id === searchId;
      } else if (searchBy === "First Name") {
        return customer.first_name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      } else {
        return customer.last_name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
    });
  }, [customers, searchValue, searchBy]);
  const totalCustomers = filteredCustomers ? filteredCustomers.length : 0;

  useEffect(() => {
    axios
      .get("http://localhost:8000/sakila_db/api/customers/")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-[50vw] m-auto flex flex-col">
      <div className="flex justify-center mb-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-1/6">
              <Plus /> New
            </Button>
          </DialogTrigger>
          <EditAddCustomer setCustomers={setCustomers} />
        </Dialog>
      </div>
      <div className="flex flex-col justify-between h-[78dvh]">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers
              ? filteredCustomers
                  .slice(startIndex, endIndex)
                  .map((customer, id) => (
                    <Dialog key={id}>
                      <DialogTrigger asChild>
                        <TableRow className="cursor-pointer">
                          <TableCell>
                            {customer.first_name + " " + customer.last_name}
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>
                            {customer.active === 0 ? "No" : "Yes"}
                          </TableCell>
                        </TableRow>
                      </DialogTrigger>
                      <CustomerDialog
                        customer={customer}
                        setCustomers={setCustomers}
                      />
                    </Dialog>
                  ))
              : null}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${
                  startIndex === 0
                    ? "pointer-events-none opacity-50"
                    : undefined
                } cursor-pointer`}
                onClick={() => {
                  setStartIndex(startIndex - rowsPerPage);
                  setEndIndex(endIndex - rowsPerPage);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`${
                  endIndex >= totalCustomers
                    ? "pointer-events-none opacity-50"
                    : undefined
                } cursor-pointer`}
                onClick={() => {
                  setStartIndex(startIndex + rowsPerPage);
                  setEndIndex(endIndex + rowsPerPage);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CustomerTable;
