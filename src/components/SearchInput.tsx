import { useSearchParams } from "react-router-dom";
import { onClickSearch, onKeyPressSearch } from "../helpers";
import { SearchInputProps } from "../types/api";

const SearchInput = ({
  searchValue,
  setSearchValue,
  setProductList,
}: SearchInputProps) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="flex gap-4 p-4 ">
      <input
        className="px-6 w-96"
        type="text"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={(event) =>
          onKeyPressSearch(event, searchValue, setSearchParams, () =>
            setProductList([])
          )
        }
        placeholder="Enter to search"
        autoFocus
      />
      <button
        className="text-white bg-[#fab700] flex p-2"
        onClick={() =>
          onClickSearch(searchValue, setSearchParams, () => setProductList([]))
        }
      >
        Search
      </button>
    </div>
  );
};
export default SearchInput;
