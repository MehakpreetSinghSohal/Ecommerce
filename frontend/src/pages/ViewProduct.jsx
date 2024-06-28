import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;

    const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);

    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };
        dispatch(updateStuff(fields, productID, "deleteProductReview"));
    };

    const reviewer = currentUser && currentUser._id;

    return (
        <Container>
            {loading ? (
                <Loading>Loading...</Loading>
            ) : responseDetails ? (
                <NotFound>Product not found</NotFound>
            ) : (
                <>
                    <ProductContainer>
                        <ProductImageContainer>
                            <ProductImage src={productDetails && productDetails.productImage} alt={productDetails && productDetails.productName} />
                        </ProductImageContainer>
                        <ProductInfo>
                            <ProductName>{productDetails && productDetails.productName}</ProductName>
                            <Description>{productDetails && productDetails.description}</Description>
                            <PriceContainer>
                                <PriceCost>₹{productDetails && productDetails.price && productDetails.price.cost}</PriceCost>
                                <PriceMrp>₹{productDetails && productDetails.price && productDetails.price.mrp}</PriceMrp>
                                <PriceDiscount>{productDetails && productDetails.price && productDetails.price.discountPercent}% off</PriceDiscount>
                            </PriceContainer>
                            <ProductDetails>
                                <CategoryTag>Category: {productDetails && productDetails.category}</CategoryTag>
                                <SubcategoryTag>Subcategory: {productDetails && productDetails.subcategory}</SubcategoryTag>
                            </ProductDetails>
                        </ProductInfo>
                    </ProductContainer>

                    {currentRole === "Customer" && (
                        <ButtonContainer>
                            <BasicButton onClick={() => dispatch(addToCart(productDetails))}>Add to Cart</BasicButton>
                        </ButtonContainer>
                    )}

                    <ReviewWritingContainer>
                        <StyledTypography variant="h4">Reviews</StyledTypography>
                    </ReviewWritingContainer>

                    {productDetails.reviews && productDetails.reviews.length > 0 ? (
                        <ReviewContainer>
                            {productDetails.reviews.map((review, index) => (
                                <ReviewCard key={index}>
                                    <ReviewCardDivision>
                                        <Avatar sx={{ width: "60px", height: "60px", marginRight: "1rem", backgroundColor: generateRandomColor(review._id) }}>
                                            {String(review.reviewer.name).charAt(0)}
                                        </Avatar>
                                        <ReviewDetails>
                                            <Typography variant="h6">{review.reviewer.name}</Typography>
                                            <ReviewMeta>
                                                <Typography variant="body2">{timeAgo(review.date)}</Typography>
                                                {review.reviewer._id === reviewer && (
                                                    <IconButton onClick={handleOpenMenu} sx={{ ml: 1 }}>
                                                        <MoreVert />
                                                    </IconButton>
                                                )}
                                            </ReviewMeta>
                                            <Typography variant="subtitle1">Rating: {review.rating}</Typography>
                                            <Typography variant="body1">{review.comment}</Typography>
                                        </ReviewDetails>
                                    </ReviewCardDivision>
                                    {review.reviewer._id === reviewer && (
                                        <Menu
                                            anchorEl={anchorElMenu}
                                            open={Boolean(anchorElMenu)}
                                            onClose={handleCloseMenu}
                                            onClick={handleCloseMenu}
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        >
                                            <MenuItem onClick={() => deleteHandler(review._id)}>Delete</MenuItem>
                                        </Menu>
                                    )}
                                </ReviewCard>
                            ))}
                        </ReviewContainer>
                    ) : (
                        <ReviewWritingContainer>
                            <StyledTypography variant="h6">No Reviews Found. Add a review.</StyledTypography>
                        </ReviewWritingContainer>
                    )}
                </>
            )}
        </Container>
    );
};

export default ViewProduct;

const Container = styled.div`
    padding: 20px;
`;

const Loading = styled.div`
    text-align: center;
`;

const NotFound = styled.div`
    text-align: center;
`;

const ProductContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
`;

const ProductImageContainer = styled.div`
    flex: 0 0 auto;
`;

const ProductImage = styled.img`
    max-width: 300px;
`;

const ProductInfo = styled.div`
    flex: 1;
`;

const ProductName = styled.h1`
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
`;

const Description = styled.p`
    margin-top: 16px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    font-family: 'Roboto', sans-serif;
`;

const PriceContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const PriceMrp = styled.p`
    margin-top: 8px;
    text-decoration: line-through;
    color: #525050;
`;

const PriceCost = styled.h3`
    margin-top: 8px;
`;

const PriceDiscount = styled.p`
    margin-top: 8px;
    color: darkgreen;
`;

const ProductDetails = styled.div`
    margin: 16px;
`;

const CategoryTag = styled.div`
    display: inline-block;
    padding: 6px 12px;
    background-color: #f0f0f0;
    color: #333;
    border-radius: 20px;
    margin-bottom: 8px;
`;

const SubcategoryTag = styled.div`
    display: inline-block;
    padding: 6px 12px;
    background-color: #f0f0f0;
    color: #333;
    border-radius: 20px;
    margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const ReviewWritingContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const StyledTypography = styled(Typography)`
    font-family: 'Roboto', sans-serif;
`;

const ReviewContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
    && {
        background-color: white;
        margin-bottom: 2rem;
        padding: 1rem;
    }
`;

const ReviewCardDivision = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const ReviewDetails = styled.div`
    flex: 1;
`;

const ReviewMeta = styled.div`
    display: flex;
    align-items: center;
`;

