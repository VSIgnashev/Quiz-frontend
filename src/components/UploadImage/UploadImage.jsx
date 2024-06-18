import { useState, React } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "./UploadImage.module.scss";
import { MuiFileInput } from "mui-file-input";
import { IconButton, SvgIcon } from "@mui/material";
import { Done, FileUpload } from "@mui/icons-material";

const UPLOAD_FILE_URL = "/file/upload";

function UploadImage({ text = "upload", handleUpload }) {
  const axiosPrivate = useAxiosPrivate();
  const [image, setImage] = useState(null);
  const [isUploadDone, setIsUploadDone] = useState(false);

  const handleInputImage = (e) => {
    "input" + e.target.files[0];
    setImage(e.target.files[0]);
  };

  const handleChange = (newFile) => {
    setImage(newFile);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData;
    formData?.file;

    try {
      const response = await axiosPrivate.post(UPLOAD_FILE_URL, formData);
      response;
      handleUpload(response.data.id);
      setIsUploadDone(true);
    } catch (err) {
      err;
    }
  };

  return (
    <>
      <div className="flex justify-start items-start">
        <div className="">
          <MuiFileInput
            className="w-[350px] "
            placeholder="Choose an image"
            value={image}
            onChange={handleChange}
          />
        </div>

        <div className="ml-4">
          <IconButton
            onClick={handleUploadImage}
            disabled={isUploadDone || !image}
          >
            <SvgIcon
              component={isUploadDone ? Done : FileUpload}
              fontSize="large"
              sx={
                //rgb(17 24 39)
                isUploadDone
                  ? { cursor: "default", color: "black" }
                  : {
                      color: "black ",
                      transitionDuration: "4s",
                      "&:hover": {
                        color: "#111827",
                      },
                    }
              }
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default UploadImage;
