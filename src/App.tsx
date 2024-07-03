import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProduts, getSearchProduts } from "./apis/products.api";
import Loader from "./components/Loader";
import ProductListItem from "./components/ProductListItem";
import SearchInput from "./components/SearchInput";
import { PAGE_DEFAULT } from "./constants/page";
import { getSkipByPage, handleToastify } from "./helpers";
import { StringMap } from "./types/api";
import { IAPIResProduct, IQueryProduct } from "./types/products";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  // State
  const [productList, setProductList] = useState<IAPIResProduct>([]);
  const [totalProduct, setTotalProduct] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const pageParam = searchParams.get("page");

  // Get Product
  const loadProducts = (query: IQueryProduct) => {
    setLoading(true);
    if (!searchValue) {
      getProduts({ ...query })
        .then(({ products, total }) => {
          setProductList((prev) => [...prev, ...products]);
          setLoading(false);
          setTotalProduct(total);
        })
        .catch((error) => {
          console.log("error", error);
          handleToastify("error", error);
        });
      return;
    }
    getSearchProduts({ ...query, q: searchValue })
      .then(({ products, total }) => {
        setProductList((prev) => [...prev, ...products]);
        setLoading(false);
        setTotalProduct(total);
      })
      .catch((error) => {
        console.log("error", error);
        handleToastify("error", error);
      });
  };

  // Debounce When infinity
  const debounceScrollFunction = debounce(async () => {
    await setSearchParams({ page: String(Number(pageParam) + 1) });
  }, 300);

  // Handle Update Product Infinity Scroll With Infinity
  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (productList.length === totalProduct) {
        return;
      }
      debounceScrollFunction();
    }
  };

  // Add & Remove Event Scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageParam]);

  // Get Params URL & Load Product
  useEffect(() => {
    if (searchParams.size) {
      const params: StringMap = { page: "1" };
      for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        params[param] = value;
      }

      if (Object.keys(params).length) {
        !searchValue
          ? loadProducts({ skip: getSkipByPage(Number(params["page"])) })
          : loadProducts({
              skip: getSkipByPage(Number(params["page"])),
              q: searchValue,
            });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ page: String(PAGE_DEFAULT) });
  }, []);

  return (
    <div className="flex flex-col items-center p-6 gap-2 bg-[#f5f5f5]">
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setProductList={setProductList}
      />{" "}
      <div className="">
        {productList?.map((product) => {
          return (
            <ProductListItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              images={product.images}
            />
          );
        })}
        {productList?.length < 1 && searchValue && (
          <div>Không tìm thấy kết quả nào</div>
        )}
      </div>
      {loading && <Loader />}
      <ToastContainer />
    </div>
  );
}

export default App;
