/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFetchSingleListingQuery } from "../features/listing/listingApiSlice";
import { getSingleListing } from "../features/listing/listingSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ShareIcon from "../assets/svg/shareIcon.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Swiper, SwiperSlide } from "swiper/react";

const SingleListing = () => {
  const listing = useSelector((state) => state.listing.singleListing);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, isLoading } = useFetchSingleListingQuery(id);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await data;
        console.log(res);
        dispatch(getSingleListing(res.data));
        toast.success("successfully fetched");
        return res;
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [data, error, dispatch]);
  const [shareLinkCopied, setShareLinkCopied] = useState(null);
  {
    isLoading && <Spinner />;
  }
  // {listing.imageUrls.map((url, index) => (
  //   <img src={`../../../backend/public/${url}`} key={index} alt="" />
  // ))}
  return (
    <main>
      {listing !== null && (
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listing.imageUrls.map((a, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `url(../../../backend/public/${a}) center no-repeat`,
                  backgroundSize: "cover",
                  height: "100%",
                  width: "100%",
                }}
                className="swiperSlideDiv"
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
                <div style={{ color: "transparent" }}>.</div>
                <div style={{ color: "transparent" }}>.</div>
                <div style={{ color: "transparent" }}>.</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div
        className="shareIconDiv"
        onClick={(e) => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
        }}
      >
        <img src={ShareIcon} alt="" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      {listing ? (
        <div className="listingDetails">
          <p className="listingName">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="listingLocation">{listing.address}</p>
          <p className="listingType">
            {" "}
            For {listing.type === "rent" ? "Rent" : "Sale"}
          </p>
          {listing.offer && (
            <p className="discountPrice">
              ${listing.regularPrice - listing.discountedPrice} discount{" "}
            </p>
          )}
          <ul className="listingDetailsList">
            <li>
              {" "}
              {listing.bedrooms > 1
                ? `${listing.bedrooms} bedrooms`
                : "1 bedroom"}{" "}
            </li>
            <li>
              {" "}
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : "1 bathroom"}
            </li>
            <li> {listing.parking && "Parking Spot"} </li>
            <li> {listing.furnished && "Furnished"} </li>
          </ul>
          <p className="listingLocationTitle">Location</p>
          <div className="leafletContainer">
            <MapContainer
              style={{ height: "100%", width: "100%" }}
              center={[
                listing.geoLocation.coordinates[0],
                listing.geoLocation.coordinates[1],
              ]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  listing.geoLocation.coordinates[0],
                  listing.geoLocation.coordinates[1],
                ]}
              ></Marker>
            </MapContainer>
          </div>
          {(user && listing.user !== user._id) ||
            (!user && (
              <Link to={`/contact/${listing.user}`} className="primaryButton">
                Contact Landlord
              </Link>
            ))}
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default SingleListing;
