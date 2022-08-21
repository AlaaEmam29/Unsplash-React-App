import React from "react";
import { useGlobalContext } from "../Context/Context";

const Photos = () => {
  const { photos } = useGlobalContext();

  return (
    <>
      {photos.map((photo, index) => {
        const {
          urls: { regular },
          likes,
          alt_description,
          user: {
            name,
            portfolio_url,
            profile_image: { small },
          },
        } = photo;
        return (
          <div key={index} className="col-md-4 col-lg-3 mb-3 ">
            <article className="photo">
              <img src={regular} alt={alt_description} />
              <div className="photo-overlay">
                <a
                  href={portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={small} alt={name} className="profile-photo" />
                </a>
                <div className="photo-info">
                  <a
                    href={portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h5>{name}</h5>
                  </a>
                  <p>{likes} likes</p>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </>
  );
};
export default Photos;
