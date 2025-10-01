"use client";
import { useState, useCallback } from "react";
import SearchButton from "./SearchButton";
import SearchModal from "./SearchModal";

export default function Search() {
  const [open, setOpen] = useState(false);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  console.log("SEARCH mounted"); // للتأكد
  return (
    <>
      <SearchButton onOpen={onOpen} />
      <SearchModal open={open} onClose={onClose} />
    </>
  );
}
