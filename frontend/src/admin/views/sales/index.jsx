
import ColumnsTable from "./components/ColumnsTable";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/user/UserContext";
import { SaleContext } from "../../../context/sale/SaleContext";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const navigate = useNavigate();

  const { authenticated, isAdmin } = useContext(UserContext);
  const { sales, handleDeleteSale, handleUpdateSale } = useContext(SaleContext);

  useEffect(() => {

    if (!authenticated) {
      navigate('/login');
    }

    if (!isAdmin) {
      navigate("/");
    }

  }, [])


  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        {sales ? (<ColumnsTable
          sales={sales}
          handleDelete={handleDeleteSale}
          handleUpdateSale={handleUpdateSale}
        />) : (
          <div className="flex h-screen justify-center items-center text-4xl font-bold">No Sale Found</div>
        )}

      </div>

    </div>
  );
};

export default Sales;
