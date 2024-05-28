import React, { useRef } from "react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar({ className }) {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div className={`bg-pink-100 rounded-2xl ${className}`}>
            <SearchIcon onClick={focusInput} ml="10px" />
            <input
                ref={inputRef}
                type="text"
                name="search"
                placeholder="Search"
                aria-label="Search"
                className="px-3 py-2 font-semibold placeholder-gray-500 text-black border-none bg-pink-100 rounded-2xl focus:border-transparent focus:outline-none"
            />
        </div>
    );
}

export default SearchBar;
