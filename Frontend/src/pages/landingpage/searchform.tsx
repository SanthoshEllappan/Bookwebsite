// import React, { useState } from 'react';
// import '../../styles/landingpage.css';

// const SearchForm: React.FC = () => {
//   const [query, setQuery] = useState('');

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Handle search functionality
//     console.log('Searching for:', query);
//   };

//   return (
//     <form className='search-form' onSubmit={handleSearch}>
//       <input 
//         type='text' 
//         value={query} 
//         onChange={(e) => setQuery(e.target.value)} 
//         placeholder='Search for books...' 
//       />
//       <button type='submit'>Search</button>
//     </form>
//   );
// };

// export default SearchForm;

import React, { useState } from 'react';
import '../../styles/landingpage.css';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Call the parent component's callback on input change
  };

  return (
    <form className='search-form'>
      <input 
        type='text' 
        value={query} 
        onChange={handleChange} 
        placeholder='Search for books...' 
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchForm;
