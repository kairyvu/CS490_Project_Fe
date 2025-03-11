import { FilmDetails } from "@/types";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

const FilmDialog = (props: FilmDetails) => {
  const [rentalData, setRentalData] = useState({
    film_id: props?.film_id,
    customer_id: "",
  });
  const handleSubmit = async () => {
    try {
      const customerId = Number(rentalData.customer_id);
      if (isNaN(customerId) || !customerId) {
        throw new Error("Invalid customer ID");
      }
      console.log(rentalData);
      const response = await axios.post(
        `http://localhost:8000/sakila_db/api/rent-film/`,
        rentalData
      );
      console.log(response.data.message);
      toast("Rented Film Successfully", {
        description: "A film has been rented.",
      });
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast("Rent Failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props?.title}</DialogTitle>
        <DialogDescription>
          <div className="text-sm py-3">
            <div className="font-semibold py-1">
              Category: <span className="font-normal">{props?.category}</span>
            </div>
            <div className="font-semibold py-1">
              Rental Count:{" "}
              <span className="font-normal"> {props?.rental_count}</span>
            </div>
            <div className="font-semibold py-1">
              Description:{" "}
              <span className="font-normal">{props?.description}</span>
            </div>
            <div className="font-semibold py-1">
              Length: <span className="font-normal">{props?.length} mins</span>
            </div>
            <div className="font-semibold py-1">
              Rating: <span className="font-normal">{props?.rating}</span>
            </div>
            <div className="font-semibold py-1">
              Special Features:{" "}
              <span className="font-normal">{props?.special_features}</span>
            </div>
            <div className="font-semibold py-1">
              Release Year:{" "}
              <span className="font-normal">{props?.release_year}</span>
            </div>
            <div className="font-semibold py-1">
              Rental Rate:{" "}
              <span className="font-normal">{props?.rental_rate}</span>
            </div>
            <div className="font-semibold py-1">
              Actors: <span className="font-normal">{props?.actors}</span>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Input
          id="address"
          value={rentalData.customer_id}
          name="address"
          className="col-span-3"
          onChange={(e) =>
            setRentalData({ ...rentalData, customer_id: e.target.value })
          }
        />
        <Button type="submit" onClick={handleSubmit}>
          Rent
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default FilmDialog;
