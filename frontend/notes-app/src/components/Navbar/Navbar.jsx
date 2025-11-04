import React, { useState, useEffect } from 'react';
import ProfileInfor from '../Card/Profile';
import Search from '../Card/Search';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Navbar = ({ handleSearch, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/user");
            if (response.data && response.data.user) {
                setUser(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const performSearch = () => {
        if (handleSearch) {
            handleSearch(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        if (handleClearSearch) {
            handleClearSearch();
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    };
    return (
        <div className='bg-yellow-300 flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2'>Note</h2>

            <Search
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                onKeyDown={handleKeyDown}
                handleSearch={performSearch}
                onClearSearch={onClearSearch}
            />

            <ProfileInfor
                user={user}
                onLogout={onLogout} 
            />
        </div>
    );
}

export default Navbar;