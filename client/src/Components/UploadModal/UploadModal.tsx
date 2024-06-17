import React, { useState, useEffect } from 'react';
import { addImage } from '../../Services/apiService';
import './UploadModal.css';
import Button from '../Button/Button';
import {  IImage, ITempChecks } from './Types.Modal';
import {FormDataProps} from '../../Services/apiService';


const UploadModal = ({ onClose }) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER;

  const [formData, setFormData] = useState<FormDataProps>({
    imgURL: '',
    item: '',
    tempRange: [],
    rain: '',
  });

  const [image, setImage] = useState<IImage>({url: {} as File})

  const [tempChecks, setTempChecks] = useState<ITempChecks>({tempChecks : []});

  useEffect(() => {
    if (formData.imgURL === '') {
      //if setFormData is not finished, return early
      return;
    }
    addImage(formData); //post to database
    onClose(); // Close the modal after uploading TODO: Close modal using a button and/or clicking background as well
  }, [formData.imgURL]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;

    if (name === 'rain') {
      value = value === 'true'? 'true' : 'false';
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      console.log("Event.target.file",event.target.files[0])
      setImage({url: event.target.files[0]});

    }
  };

  const handleTempChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    let { value, checked } = event.target;
    value = value.toLowerCase();
    // Case 1 : The user checks the box
    if (checked) {
      setTempChecks((prevTempChecks) => {
        return {tempChecks : [...prevTempChecks.tempChecks, value]}
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setTempChecks({
        tempChecks: tempChecks.tempChecks.filter((event) => event !== value)
      });
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const fd = new FormData();
      fd.append('file', image.url);
      fd.append('folder', folder);
      fd.append('upload_preset', uploadPreset);
      fd.append('resorce_type', 'image');

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const options = {
        method: 'POST',
        body: fd,
      };
      const response = await fetch(url, options).then((res) => res.json()); //just needed to parse the response body :-)

      const resURL = response.secure_url;

      setFormData((formData) => ({
        ...formData,
        imgURL: resURL,
        tempRange: [...tempChecks.tempChecks],
      }));
    } catch (error) {
      console.error('Upload failed', error);
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
            <legend >Choose a picture to upload</legend>
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
                checked={formData.item === 'Top'}
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
                checked={formData.item === 'Bottom'}
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
                checked={formData.item === 'Shoe'}
                onChange={handleChange}
              />
              <label htmlFor="shoe">Shoe</label>
            </div>
          </fieldset>

          <fieldset className=" fieldset temperature">
            <legend>For which temperature is it comfortable?</legend>
            <div>
              <input
                type="checkbox"
                id="cold"
                name="tempRange"
                value="Cold"
                //checked={formData.tempRange === 'Cold'}
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
                //checked={formData.tempRange === 'Cool'}
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
                //checked={formData.tempRange === 'Warm'}
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
                //checked={formData.tempRange === 'Hot'}
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
                value='true'
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
                value='false'
                checked={formData.rain === "false"}
                onChange={handleChange}
              />
              <label htmlFor="no">No</label>
            </div>
          </fieldset>

          <Button text="Upload" />
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
