import React from 'react';

const Search = () => {
  return (
    <div className="flex items-center justify-center ">
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Search
      </button>
    </div>
  );
};

export default Search;
