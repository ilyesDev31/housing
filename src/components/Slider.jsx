import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "swiper/swiper-bundle.css";
import "swiper/css";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Slider = ({ list }) => {
  const navigate = useNavigate();
  let images = [];

  if (list && list.listings) {
    console.log(list);
  } else {
    return <Spinner />;
  }
  {
    images.length === 0 && <Spinner />;
  }
  return (
    <Swiper slidesPerView={1} pagination={{ clickable: true }}>
      {list.listings.map((a, index) => {
        console.log(a.type);
        return (
          <SwiperSlide
            key={index}
            onClick={() => navigate(`/category/${a.type}/${a._id}`)}
          >
            <div
              style={{
                background: `url(../../../backend/public/${a.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
                height: "100%",
                width: "100%",
              }}
            >
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <div style={{ color: "transparent" }}>.</div>
              <p className="swiperSlideText"> {a.name} </p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
