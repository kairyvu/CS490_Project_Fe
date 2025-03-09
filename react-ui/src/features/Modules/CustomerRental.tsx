import { Rental } from "@/types";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import timeConvert from "@/utils/timeConvert";

interface CustomerRentalProps {
  customer_id: number;
}
const CustomerRental = ({ customer_id }: CustomerRentalProps) => {
  const [rentals, setRentals] = useState<Rental[] | null>([]);

  useEffect(() => {
    if (customer_id) {
      axios
        .get(
          `http://localhost:8000/sakila_db/api/customer/${customer_id}/rentals/`
        )
        .then((response) => {
          setRentals(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [customer_id]);
  return (
    <DrawerContent className="max-h-[70svh]">
      <div className="w-[60vw] m-auto pt-10 overflow-auto">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader className="shadow">
            <TableRow>
              <TableHead>Film Title</TableHead>
              <TableHead>Rental Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals
              ? rentals.map((rental, id) => (
                  <TableRow key={id}>
                    <TableCell>{rental.film_title}</TableCell>
                    <TableCell>{timeConvert(rental.rental_date)}</TableCell>
                    <TableCell>
                      {rental.return_date
                        ? timeConvert(rental.return_date)
                        : null}
                    </TableCell>
                    <TableCell>{rental.rental_status}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
      <DrawerFooter className="w-[40vw] m-auto">
        <DrawerClose asChild>
          <Button>Back</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default CustomerRental;
