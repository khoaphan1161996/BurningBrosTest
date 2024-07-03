import { debounce } from "lodash";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useInfinityScroll = (isLoadMore: boolean) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");

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
      if (isLoadMore) {
        debounceScrollFunction();
      }
    }
  };

  // Add & Remove Event Scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageParam]);

  return null;
};

export default useInfinityScroll;
