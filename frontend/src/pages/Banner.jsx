import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../utils/products";

// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// import './Banner.css';

// const CustomPrevArrow = ({ onClick }) => {
//     return (
//         <div className="arrow arrow-prev" onClick={onClick}>
//             <ArrowBackIosNewIcon />
//         </div>
//     );
// };

// const CustomNextArrow = ({ onClick }) => {
//     return (
//         <div className="arrow arrow-nexr" onClick={onClick}>
//             <ArrowForwardIosIcon />
//         </div>
//     );
// };

const Banner = () => {
  return (
    <Carousel
      arrows={true}
      swipeable={false}
      draggable={false}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      showDots={false}
      slidesToSlide={1}
      customTransition="all .5"
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      // customRightArrow={<CustomNextArrow />}
      // customLeftArrow={<CustomPrevArrow />}
    >
      {bannerData.map((image) => (
        <a href={image.productLink} key={image._id}>
          <Image src={image.url} alt={image.alt} />
        </a>
      ))}
    </Carousel>
  );
};

export default Banner;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Image = styled("img")(({ theme }) => ({
  // borderRadius: "10px",
  width: "100%",
  height: 400,
  objectFit: "contain",
  [theme.breakpoints.down("sm")]: {
    height: 180,
  },
  cursor: "pointer",
  transition: "transform 0.2s ease-in -out",
}));
