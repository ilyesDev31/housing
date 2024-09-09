import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import Slider from "../components/Slider";
import { useGetAllListing1Query } from "../features/listing/listingApiSlice";
import { useDispatch } from "react-redux";
import { getListing } from "../features/listing/listingSlice";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
const Explore = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllListing1Query();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await data;
        dispatch(getListing(res.listings));
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [data, error]);
  {
    isLoading && <Spinner />;
  }
  return (
    <div className="explore">
      <header>
        <p className="pageHeader"> Explore </p>
      </header>
      <main>
        <Slider list={data} />
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCaegories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for sell</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
