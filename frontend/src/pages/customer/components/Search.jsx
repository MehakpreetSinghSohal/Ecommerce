import { InputBase, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchedProducts } from '../../../redux/userHandle';

const Search = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    console.log("Dispatching search with term:", searchTerm);
    dispatch(getSearchedProducts("searchProduct", searchTerm));

    if (location.pathname !== "/ProductSearch") {
      navigate("/ProductSearch");
    }
  };

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}

        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            console.log("Enter Key Pressed");
            handleSearch();
          }
        }}



        // onKeyDown={(e) => {
        //   if (e.key === 'Enter') {
        //     handleSearch();
        //   }
        // }}
      />
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "#4d1c9c" }} />
      </SearchIconWrapper>
    </SearchContainer>
  )
}

const SearchContainer = styled(Box)`
  border-radius: 10px; 
  margin-right: 10px;
  width: 110px;          
  background-color: #fff;
  display: flex;
  transition: all 0.3s ease-in-out;  
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
//   height: 20px;

  &:hover {  
    width: 350px;     
    // background: linear-gradient(to right, #4d1c9c, #722ef2); 
    color: white; 
  }
  `;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
  font-family: 'Helvetica:', sans-serif;
`;

export default Search;