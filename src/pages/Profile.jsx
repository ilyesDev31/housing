import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "../features/user/authSlice";
import {
  useLogoutMutation,
  useUpdateProfileMutation,
} from "../features/user/userApiSlice";
import ListingItem from "../components/ListingItem";
import {
  useFetchUserListingsQuery,
  useDeleteListingMutation,
} from "../features/listing/listingApiSlice";
import { getUserListing } from "../features/listing/listingSlice";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  let [listings, setListings] = useState([
    ...useSelector((state) => state.listing.userListings),
  ]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [deleteListing] = useDeleteListingMutation();

  const listingsData = useFetchUserListingsQuery();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const onChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const [changeDetails, setChangeDetails] = useState(false);
  const { name, email } = formData;

  const onLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const onSubmit = async () => {
    if (name.trim() === "" || email.trim() === "") {
      return toast.error("please fill in name and email fields");
    }
    try {
      const res = await updateProfile({
        name,
        email,
      }).unwrap();
      dispatch(
        setCredentials({
          ...res.user,
          name: res.user.name,
          email: res.user.email,
        })
      );
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const removeItem = async (id, name) => {
    if (window.confirm("do you want to delete this listing")) {
      const res = await deleteListing(id).unwrap();
      listings = listings.filter((a) => a.id === id);
      const updatedListing = listings.filter((a) => a.id !== id);
      setListings(updatedListing);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchData = async () => {
      const res = await listingsData.data;
      dispatch(getUserListing(res.data));
    };
    fetchData();
  }, [user, navigate, listingsData.data, listingsData.error, dispatch]);
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={(e) => {
              e.preventDefault();
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              name="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              value={name}
              onChange={onChange}
              disabled={!changeDetails}
            />
            <input
              type="email"
              name="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              value={email}
              onChange={onChange}
              disabled={!changeDetails}
            />
          </form>
        </div>
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="" />
        </Link>
        {/* listings */}
        {!useDeleteListingMutation()[1].isLoading && listings.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map((a, index) => (
                <ListingItem
                  key={index}
                  item={a}
                  onDelete={() => removeItem(a._id, a.name)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
