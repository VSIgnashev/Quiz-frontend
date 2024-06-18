import React, { useState } from "react";

const initImg = {
    imageUrl:"/"
};
function ImageCropper() {
  const [image, setImage] = useState(initImg);
  return (
    <div>
      <img src={image.imageUrl} alt="" />
    </div>
  );
}

export default ImageCropper;
