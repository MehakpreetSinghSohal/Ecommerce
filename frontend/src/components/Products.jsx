import React from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';

const Products = ({ productData }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const itemsPerPage = 12;

  const { currentRole, responseSearch } = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showPopup, setShowPopup] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleUpload = (event, product) => {
    event.stopPropagation();
    console.log(product);
    dispatch(addStuff("ProductCreate", product));
  };

  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first")
    setShowPopup(true)
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (responseSearch) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductGrid container spacing={3} sx={{ marginTop: '24px' }}>
        {currentItems.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} onClick={() => navigate("/product/view/" + data._id)} sx={{ cursor: "pointer" }}>
            <ProductContainer>
              <ProductImageContainer>
                <ProductImage src={data.productImage} />
              </ProductImageContainer>
              <ProductDetails>
                <ProductName>{data.productName}</ProductName>
                <PriceMrp>{data.price.mrp}</PriceMrp>
                <PriceCost>₹{data.price.cost}</PriceCost>
                <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
              </ProductDetails>
              <AddToCart>
                {currentRole === "Customer" &&
                  <>
                    <BasicButton onClick={(event) => handleAddToCart(event, data)}>Add To Cart</BasicButton>
                  </>
                }
                {currentRole === "Shopcart" &&
                  <>
                    <BasicButton onClick={(event) => handleUpload(event, data)}>Upload</BasicButton>
                  </>
                }
                {currentRole === null &&
                  <>
                    <BasicButton onClick={messageHandler}>Add To Cart</BasicButton>
                  </>
                }
              </AddToCart>
            </ProductContainer>
          </Grid>
        ))}
      </ProductGrid>

      <Container sx={{ mt: 10, mb: 10, display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <Pagination
          count={Math.ceil(productData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Container>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
};

export default Products;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImageContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
`;

const ProductImage = styled.img`
 width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
`;

const PriceMrp = styled.p`
  text-align: center;
  text-decoration: line-through;
  color: #525050;
`;

const PriceCost = styled.h3`
  text-align: center;
`;

const PriceDiscount = styled.p`
  text-align: center;
  color: darkgreen;
`;

const AddToCart = styled.div`
  margin-top: auto;
`;
