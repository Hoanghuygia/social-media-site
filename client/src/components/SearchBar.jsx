import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import SearchModal from "./SearchModal";

const SearchBar = forwardRef(({ className }, ref) => {
    const inputRef = useRef(null);
    const searchBarRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [query, setQuery] = useState("");

    useImperativeHandle(ref, () => ({
        focus: () => {
            if (inputRef.current) {
                console.log('Focusing on input');
                inputRef.current.focus();
            }
        },
        clear: () => {
            setQuery("");
        }
    }));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "https://sugar-cube.onrender.com/user/userlist",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setQuery(query);
        const filtered = users.filter(
            (user) =>
                (user.username &&
                    user.username.toLowerCase().includes(query)) ||
                (user.firstName &&
                    user.firstName.toLowerCase().includes(query)) ||
                (user.lastName && user.lastName.toLowerCase().includes(query))
        );
        setFilteredUsers(filtered);
    };

    const handleClickOutside = (event) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target)
        ) {
            setQuery("");
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={searchBarRef}
            className={`relative bg-pink-100 rounded-2xl ${className}`}
        >
            <SearchIcon onClick={() => inputRef.current.focus()} ml="10px" />
            <input
                ref={inputRef}
                type="text"
                name="search"
                placeholder="Search"
                aria-label="Search"
                className="px-3 py-2 font-semibold placeholder-gray-500 text-black border-none bg-pink-100 rounded-2xl focus:border-transparent focus:outline-none"
                onChange={handleSearch}
                value={query}
            />
            {query && (
                <div className="absolute w-full z-10 bg-white shadow-lg rounded-lg">
                    <SearchModal
                        filteredUsers={filteredUsers}
                        setQuery={setQuery}
                    />
                </div>
            )}
        </div>
    );
});

export default SearchBar;
