import { Divider, Box, Typography, Button, styled, Container, Grid, useTheme } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

const Slide = ({ products, title, tagline }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const ProductCard = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25;
    border-radius: ${theme.shape.borderRadius};
    box-shadow: ${theme.shadows[2]};
    transition: transform 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.02);
    }
  `;

  return (
    <Box>
      <Deal>
        <DealText>{title}</DealText>
        {/* {console.log('Tag to Filter:', tag)} */}
        <ViewAllButton
          variant="contained"
          onClick={() => navigate(`/products?tagline=${tagline}`)}
          // onClick={() => {
          //   // Inspect the tag value
          //   navigate(`/products?tagline=${tagline}`);
          // }}
        >
          View All
        </ViewAllButton>
      </Deal>

      <Divider />

      <Grid container spacing={2} style={{ padding: 20 }}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/product/view/${product._id}`} style={{ textDecoration: 'none' }}>
              <ProductCard  >
                <Image src={product.productImage} style={{ height: '250px', width: 'auto' }} />
                <TitleText style={{ fontWeight: 600, color: '#212121' }}>
                  {product.productName}
                </TitleText>
                <TextContainer>
                  <Text style={{ color: '#525050', textDecoration: "line-through" }}>
                    {product.price.mrp}
                  </Text>
                  <Text>₹{product.price.cost}</Text>
                  <Text style={{ color: 'green' }}>
                    {product.price.discountPercent}% Off
                  </Text>
                </TextContainer>
                {/* <Text style={{ color: '#212121', opacity: '.6' }}>
                                    {product.tagline}
                                </Text> */}
              </ProductCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box >
  );
};

export default Slide;

const Deal = styled(Box)`
  display: flex;
  padding: 15px 20px;
`;

const DealText = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  margin-right: 25px;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: #4d1c9c;
  border-radius: 2px;
  font-size: 13px;
  & hover {
    background-color: #7a1ccb;
  }
`;

const Image = styled('img')({
  width: 'auto',
  height: 250,
});

const TitleText = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
`;

const TextContainer = styled(Container)`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin: 8px;
// font-family: 'Montserrat', sans-serif; /* Replace with your chosen font */
//   font-weight: 600;
//   color: '#212121'; /* Or a rich color that complements your brand */
//   text-decoration: underline 1px #212121; /* Optional: Subtle underline */
//   letter-spacing: 0.5px; /* Optional: Slight increase in letter spacing */
//   text-transform: uppercase; /* Optional: Change to lowercase if desired */
`;
