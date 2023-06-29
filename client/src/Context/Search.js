import { useState, useContext, createContext } from "react";

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ search, setSearch }}>
        {children}
      </SearchContext.Provider>
    </>
  );
};

export default SearchProvider;
