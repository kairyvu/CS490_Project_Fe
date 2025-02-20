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
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CustomerDialog from "./CustomerDialog";

const CustomerTable = () => {
  const rowsPerPage = 20;
  const [customers, setCustomers] = useState<Customer[] | null>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const totalCustomers = customers ? customers.length : 0;

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
    <div className="flex flex-col h-screen justify-between w-[50vw] m-auto pt-15">
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
          {customers
            ? customers.slice(startIndex, endIndex).map((customer, id) => (
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
                  <CustomerDialog {...customer} />
                </Dialog>
              ))
            : null}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                endIndex >= totalCustomers
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage);
                setEndIndex(endIndex + rowsPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomerTable;
