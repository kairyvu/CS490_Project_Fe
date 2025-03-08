import { FilmDetails } from "@/types";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FilmDialog = (props: FilmDetails) => {
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
    </DialogContent>
  );
};

export default FilmDialog;
