import Banner from "./components/Banner";


import HistoryCard from "./components/HistoryCard";
import NftCard from "../../components/card/NftCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/user/UserContext";
import { ProductContext } from "../../../context/product/ProductContext";
import { CategoryContext } from "../../../context/category/CategoryContext";
import AddProductForm from "../../components/AddProductForm";
import AddCategoryDialog from "../../components/AddCategoryDialog";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const { authenticated, isAdmin } = useContext(UserContext);
  const { products, handleAddProduct, handleDeleteProduct, handleUpdateProduct } = useContext(ProductContext);
  const { categories, handleAddCategory, handleUpdateCategory, handleDeleteCategory } = useContext(CategoryContext);


  const [isOpen, setIsOpen] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {

    if (!authenticated) {
      navigate('/login');
    }

    if (!isAdmin) {
      navigate("/");
    }

  }, [])

  return (

    <>
      <div className="mt-3">
        <Banner setIsOpen={setIsOpen} setShowAddCategory={setShowAddCategory} />
      </div>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          {/* Banner */}


          {/* Header */}
          <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
            <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              Products
            </h4>
            <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  Burgers
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  Sandwiches
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  Fries
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href=" "
                >
                  Drinks
                </a>
              </li>
            </ul>
          </div>

          {/* Product card */}
          <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-2">
            {products ? (products.map((product) => (

              <NftCard key={product._id}
                product={product}
                handleDelete={handleDeleteProduct}
                handleUpdate={handleUpdateProduct}
              />

            ))) : (
              <div className="h-screen justify-center items-center text-4xl font-bold">No Product Found</div>
            )

            }

          </div>

        </div>

        {/* right side section */}

        <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
          {/* <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        /> */}

          {categories ? (

            <HistoryCard categories={categories} handleUpdateCategory={handleUpdateCategory} handleDeleteCategory={handleDeleteCategory} />

          ) : (

            <div className="flex h-screen justify-center items-center font-bold text-4xl"> No Category Found</div>

          )}

        </div>
      </div>

      <AddProductForm isOpen={isOpen} setIsOpen={setIsOpen} handleAddProduct={handleAddProduct} />
      <AddCategoryDialog isOpen={showAddCategory} setIsOpen={setShowAddCategory} handleAddCategory={handleAddCategory} />
    </>
  );
};

export default Products;
