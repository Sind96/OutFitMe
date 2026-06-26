import React, { useState } from "react";
import { addClothingItem } from "../../services/clothingItemService";
import "./UploadModal.css";
import Button from "../Button/Button";
import type {
  TempChecksState,
  UploadImageState,
  UploadModalProps,
} from "./UploadModal.types";
import { ClothingItemFormData } from "../../types/clothingItem.types";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks/reduxHooks";

const UploadModal = ({ onClose, onUploadSuccess }: UploadModalProps) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER;

  const { currentUser } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<ClothingItemFormData>({
    userId: "",
    imgURL: "",
    item: "",
    tempRange: [],
    rain: "",
  });

  const [image, setImage] = useState<UploadImageState>({ file: null });

  const [tempChecks, setTempChecks] = useState<TempChecksState>({
    tempChecks: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;

    if (name === "rain") {
      value = value === "true" ? "true" : "false";
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImage({ file: event.target.files[0] });
    }
  };

  const handleTempChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, checked } = event.target;
    value = value.toLowerCase();

    if (checked) {
      setTempChecks((prevTempChecks) => {
        return { tempChecks: [...prevTempChecks.tempChecks, value] };
      });
    } else {
      setTempChecks({
        tempChecks: tempChecks.tempChecks.filter((event) => event !== value),
      });
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image.file) {
      console.error("No file selected");
      return;
    }
    try {
      const uploadFormData = new FormData();

      uploadFormData.append("file", image.file);
      uploadFormData.append("folder", folder);
      uploadFormData.append("upload_preset", uploadPreset);
      uploadFormData.append("resource_type", "image");

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const response = await fetch(url, {
        method: "POST",
        body: uploadFormData,
      });

      const uploadResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          uploadResponse.error?.message || "Cloudinary upload failed.",
        );
      }

      const imageUrl = uploadResponse.secure_url;

      if (!imageUrl) {
        throw new Error("Cloudinary did not return an image URL.");
      }

      if (!currentUser?._id) {
        toast.error("You need to be signed in to upload clothing items.");
        return;
      }

      const clothingItemPayload: ClothingItemFormData = {
        ...formData,
        userId: currentUser._id,
        imgURL: imageUrl,
        tempRange: tempChecks.tempChecks,
      };

      await addClothingItem(clothingItemPayload);
      toast.success("Clothing item uploaded successfully.");
      onUploadSuccess();
      onClose();
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload clothing item.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="top">
          <span className="close" onClick={onClose}>
            X
          </span>
          <h2>Ready to upload your clothing item?</h2>
        </div>

        <form className="form" onSubmit={handleUpload}>
          <fieldset className="fieldset picture">
            <legend>Choose a picture to upload</legend>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
          </fieldset>

          <fieldset className="fieldset clothing">
            <legend>What type of clothing item is this?</legend>
            <div>
              <input
                type="radio"
                id="top"
                name="item"
                value="Top"
                checked={formData.item === "Top"}
                onChange={handleChange}
              />
              <label htmlFor="top">Top</label>
            </div>
            <div>
              <input
                type="radio"
                id="bottom"
                name="item"
                value="Bottom"
                checked={formData.item === "Bottom"}
                onChange={handleChange}
              />
              <label htmlFor="bottom">Bottom</label>
            </div>
            <div>
              <input
                type="radio"
                id="shoe"
                name="item"
                value="Shoe"
                checked={formData.item === "Shoe"}
                onChange={handleChange}
              />
              <label htmlFor="shoe">Shoe</label>
            </div>
          </fieldset>

          <fieldset className=" fieldset temperature">
            <legend>For which temperature is it comfortable?</legend>
            <div className="check">
              <input
                type="checkbox"
                id="cold"
                name="tempRange"
                value="Cold"
                onChange={handleTempChange}
              />
              <label htmlFor="cold">Cold</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="cool"
                name="tempRange"
                value="Cool"
                onChange={handleTempChange}
              />
              <label htmlFor="cool">Cool</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="warm"
                name="tempRange"
                value="Warm"
                onChange={handleTempChange}
              />
              <label htmlFor="warm">Warm</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="hot"
                name="tempRange"
                value="Hot"
                onChange={handleTempChange}
              />
              <label htmlFor="hot">Hot</label>
            </div>
          </fieldset>

          <fieldset className="fieldset rain">
            <legend>Can it be worn when it rains?</legend>
            <div>
              <input
                type="radio"
                id="yes"
                name="rain"
                value="true"
                checked={formData.rain === "true"}
                onChange={handleChange}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="no"
                name="rain"
                value="false"
                checked={formData.rain === "false"}
                onChange={handleChange}
              />
              <label htmlFor="no">No</label>
            </div>
          </fieldset>

          <Button text="Upload" className="upload-button" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
