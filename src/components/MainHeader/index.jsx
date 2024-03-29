/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Modal from '@mui/material/Modal';
import './styles.css';
import { useState, useRef, useEffect } from 'react';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import UploadVideo from '../UploadVideo';
import { useChannel } from '../../channelContext';

import Search from '../Search';
import VoiceRecognition from '../VoiceRecognition';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from '../../actions/auth';

function MainHeader() {
  const { updateUser } = useChannel();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);

  const profile = useSelector((state) => state.auth?.user?.profile);
  const [open, setOpen] = useState();
  const [dropdown, setDropdown] = useState(false);
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownToggles = () => {
    setDropdown(!dropdown);
  };

  const handleMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');
    setOpen(sidebar.classList.toggle('sidebar-open'));
    setOpen(body.classList.toggle('sidebar-open--main'));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const getAvatarAsync = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BACK_PROD_BASE_URL}/api/users/${profile?._id}`);
      setAvatar(data.logo);
    };

    getAvatarAsync();
  }, [updateUser]);

  return (
    <div className="header__container">
      <div className="header__logo">
        <div className="header__logo__burger">
          <img src="/media/icons/Burger.png" alt="Menu" onClick={handleMenu} />
        </div>
        <div className="header__logo__logo">
          <Link to="/"><img className="header__logo__image" src="/media/images/logo.png" alt="Menu" /></Link>
        </div>
      </div>
      <div className="header__search-bar">
        <Search />
        <VoiceRecognition />
      </div>
      <div className="header__user">
        {
          profile && (
            <div className="header__user__apps">
              <button type="button" onClick={handleOpen}><img src="/media/icons/Addvideo.png" alt="Apps" /></button>
            </div>
          )
        }
        <div className="before__fragment">
          {
            profile
              ? (
                <div className="header__user__sign-in---logged">

                  <UploadVideo setOpenModal={setOpenModal} openModal={openModal} />
                  <div className="header__user__sign-in__text">
                    <Dropdown isOpen={dropdown} toggle={dropdownToggles}>
                      <DropdownToggle className="header__user__sign-in__text--toggle">
                        <img className="header__user__sign-in__logged-in" src={avatar || 'https://res.cloudinary.com/royhuamanavila/image/upload/v1660888009/image832_ec9r7e.png'} alt="logo" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <div>
                          <DropdownItem className="dropdown-items"><Link to={`/channel/${profile?._id}/videos`}>Mi canal</Link></DropdownItem>
                          <DropdownItem className="dropdown-items">
                            <div>
                              <button onClick={handleLogout} type="button" className="btn-primary-logout">
                                <span>Logout</span>
                              </button>
                            </div>
                          </DropdownItem>
                        </div>
                      </DropdownMenu>
                    </Dropdown>

                  </div>
                </div>
              )
              : (
                <div className="header__user__sign-in---visitor">
                  <div className="header__user__sign-in__icon">
                    <img src="/media/icons/User.png" alt="Sign In" />
                  </div>
                  <div className="header__user__sign-in__text">
                    <Link to="/login"><p className="header__user__sign-in__text--center">Sign In</p></Link>
                  </div>
                </div>
              )
          }
        </div>
      </div>

      <div className="sidebar">
        <div className="header__logo--active">
          <div className="header__logo__burger">
            <img src="/media/icons/Burger.png" alt="Menu" onClick={handleMenu} />
          </div>
          <div className="header__logo__logo">
            <Link to="/"><img className="header__logo__image" src="/media/images/logo.png" alt="Menu" /></Link>
          </div>
        </div>
        <div className="main-sidebar">
          <div className="main-sidebar__categories">
            <ul>
              <Link to="/" className="main-sidebar__category">
                <img src="/media/icons/Home-icon.png" alt="Home-icon" />
                {' '}
                Home
              </Link>
              <Link to="/" className="main-sidebar__category">
                <img src="/media/icons/Compass.png" alt="Compass-explore-icon" />
                {' '}
                Explore
              </Link>
              {
                profile && (
                  <Link to="/subscribes" className="main-sidebar__category">
                    <img src="/media/icons/Subscriptions.png" alt="Compass-explore-icon" />
                    {' '}
                    Subscribes
                  </Link>
                )
              }
            </ul>
          </div>
          <hr />
          <div className="main-sidebar__categories">
            <ul>
              <Link to="/" className="main-sidebar__category">
                <img src="/media/icons/Library.png" alt="Library-icon" />
                {' '}
                Library
              </Link>
              <Link to="/" className="main-sidebar__category">
                <img src="/media/icons/History.png" alt="History-icon" />
                {' '}
                History
              </Link>
              <Link to="/" className="main-sidebar__category">
                <img src="/media/icons/Yourvideos.png" alt="Yourvideos-icon" />
                {' '}
                Your Videos
              </Link>
              <Link to="/" className="main-sidebar__category">
                <img src="/media/icons/Watchlater.png" alt="Watchlater-icon" />
                {' '}
                Watch Later
              </Link>
              <Link to="/" className="main-sidebar__category">
                <img src="/media/icons/Mylikes.png" alt="Watchlater-icon" />
                {' '}
                Liked Videos
              </Link>
            </ul>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
