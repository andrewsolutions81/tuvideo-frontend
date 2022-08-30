/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Landing/styles.css';
import setTime from '../../services/toLocalString';
import UploadingSpinner from '../UploadingSpinner';

function LandingVideos() {
  const [allVideos, setAllVideos] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_DEV_BASE_URL}/api/videos`)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setAllVideos(res);
          setShowSpinner(true);
        } else {
          console.log('error');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    showSpinner
      ? (
        <>

          {
    Object.entries(allVideos).map((singleVideo) => (singleVideo[1]
      && (
      <div className="card__videos" key={singleVideo[1]._id}>

        <video width="320" height="180px" src={singleVideo[1].url} />
        <div className="card__info">
          <div className="card__info__title">
            <div className="ch-info-container__avatar">
              <img src="/media/images/ch-avatar.jpeg" alt="avatar" />
            </div>
            <Link to={`/api/videos/${singleVideo[1]._id}`} className="title">{singleVideo[1].title}</Link>
          </div>
          <div className="card__info__channel">
            <p className="more-videos-container__ch-name">Channel</p>
            <p className="more-videos-container__views">
              206 visualizaciones •
              {' '}
              {setTime(singleVideo[1].createdAt)}
            </p>
          </div>
        </div>
      </div>

      )
    ))

    }

        </>
      )
      : <UploadingSpinner />
  );
}

export default LandingVideos;
