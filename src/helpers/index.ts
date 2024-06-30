import { KeyboardEvent } from "react";
import { LIMIT, PAGE_DEFAULT } from "../constants/page";
import { toast, TypeOptions } from "react-toastify";
// Get Page Number
export const getSkipByPage = (page: number): number => {
  return (page - 1) * LIMIT;
};

// Handle On KeyPress Input Search
export const onKeyPressSearch = (
  event: KeyboardEvent<HTMLInputElement>,
  searchValue: string,
  setSearchParams: (data: Record<string, string | string[]>) => void,
  callback: () => void
) => {
  const {
    nativeEvent: { key },
  } = event;
  if (key === "Enter") {
    callback();
    searchValue
      ? setSearchParams({ page: String(PAGE_DEFAULT), q: searchValue })
      : setSearchParams({ page: String(PAGE_DEFAULT) });
  }
};

// Handle On Click Search
export const onClickSearch = (
  searchValue: string,
  setSearchParams: (data: Record<string, string | string[]>) => void,
  callback: () => void
) => {
  callback();
  searchValue
    ? setSearchParams({ page: String(PAGE_DEFAULT), q: searchValue })
    : setSearchParams({ page: String(PAGE_DEFAULT) });
};

// Handle Toastify
export const handleToastify = (type: TypeOptions, msg: string) => {
  toast(msg, {
    type,
  });
};
