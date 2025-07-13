import React from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import '../styles/ImageUpload.css';

export const ImageUpload = ({
  selectedImage,
  dragOver,
  onImageUpload,
  onDrop,
  onDragOver,
  onDragLeave,
  onRemoveImage
}) => {
  if (selectedImage) {
    return (
      <div className="selected-image-wrapper">
        <img
          src={selectedImage}
          alt="Plant to analyze"
          className="selected-image"
        />
        <button
          onClick={onRemoveImage}
          className="remove-button"
          aria-label="Remove selected image"
        >
          <AlertCircle className="remove-icon" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`image-upload-container ${dragOver ? 'drag-over' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="image-upload-content">
        <div className="icon-wrapper">
          <Upload className="upload-icon" />
        </div>
        <div>
          <p className="text-large">Drop your plant image here</p>
          <p className="text-gray">or click to browse from your device</p>
        </div>
        <div className="buttons-container">
          <label className="upload-button">
            <Upload className="icon-small" />
            <span>Choose File</span>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
          <label className="take-photo-button">
            <Camera className="icon-small" />
            <span>Take Photo</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
