import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'


const Search = ({value, onChange, handleSearch ,onClearSearch, onKeyDown}) => {
  return (
    <div className='w-[600px] flex px-4 round-md relative items-center'>
        <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        placeholder='Search notes' 
        onKeyDown={onKeyDown}
        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 border-white/20'/>

        <FaMagnifyingGlass className='absolute right-9 top-[4,5] text-gray-400 cursor-pointer' onClick={handleSearch} />
        {value && <IoMdClose className='absolute right-16 top-[4,5] text-gray-400 cursor-pointer' onClick={onClearSearch} />}
    </div>
  )
}

export default Search
