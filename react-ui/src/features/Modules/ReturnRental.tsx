import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Rental } from "@/types";
import axios from "axios";
import { toast } from "sonner";

interface ReturnRentalProps {
  film_id: number;
  customer_id: number;
  setRentals: React.Dispatch<React.SetStateAction<Rental[] | null>>;
}

const ReturnRental = ({
  film_id,
  customer_id,
  setRentals,
}: ReturnRentalProps) => {
  const fetchRentals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/sakila_db/api/customer/${customer_id}/rentals/`
      );
      setRentals(response.data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };
  const handleClick = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/sakila_db/api/return-film/",
        { film_id, customer_id }
      );
      console.log(response.data.message);
      fetchRentals();
      toast("Returned Film Successfully", {
        description: "Customer has returned the film",
      });
    } catch (error) {
      console.error(error);
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
  return <AlertDialogAction onClick={handleClick}>Return</AlertDialogAction>;
};
export default ReturnRental;
