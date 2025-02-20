import CustomerTable from "@/features/Modules/CustomerTable";
import NavBar from "@/features/Modules/NavBar";

const CustomerPage = () => {
  return (
    <div className="bg-linear-to-b from-gray-100 to-blue-300 h-full">
      <NavBar />
      <CustomerTable />
    </div>
  );
};

export default CustomerPage;
