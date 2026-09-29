import React, { useEffect } from 'react';
import MyOrderPage from './MyOrderPage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/slice/authslice';
import { clearCart } from '../../Redux/slice/cartSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="container-shop py-10 md:py-14">
      <p className="section-eyebrow">My Account</p>
      <h1 className="section-title mb-8">Welcome, {user?.name?.split(" ")[0] || "there"}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4 card-line p-6 h-fit">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-plum text-cream font-serif">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
            <div>
              <p className="font-medium text-ink">{user?.name}</p>
              <p className="text-sm text-ink-muted">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-outline w-full !border-rust !text-rust hover:!bg-rust hover:!text-cream">
            <i className="ri-logout-box-line" /> Logout
          </button>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <MyOrderPage />
        </div>
      </div>
    </div>
  );
};

export default Profile;
