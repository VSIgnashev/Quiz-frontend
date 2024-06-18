import React from "react";
import config from "./../../config";
const BASE_URL = config.API_URL;

function DownloadImage({ imagePath }) {
  return (
    <>
      <img
        src={BASE_URL + imagePath}
        onError={(error) =>
          (error.currentTarget.src = "./images/default_quiz_image.png")
        }
      />
    </>
  );
}

export default DownloadImage;
