import React, { FC, useState } from "react";
import { Input } from "../ui/form";

const SearchInput: FC<{
  className?: string;
  placeholder?: string;
  onSubmit(search: string): void;
}> = ({ placeholder = "Tìm kiếm", onSubmit, className }) => {
  const [search, setSearch] = useState("");

  return (
    <Input
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onSubmit(search);
        }
      }}
      className={className}
    />
  );
};

export default SearchInput;
