import { useState, useContext, createContext } from "react";

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    let keyword = localStorage.getItem("");
    let results = JSON.parse(localStorage.getItem [""] || "{}");
    return { keyword, results };
  });


  return (
    <>
      <SearchContext.Provider value={{ auth, setAuth }}>
        {children}
      </SearchContext.Provider>
    </>
  );
};

// custom hook

export default SearchProvider;
