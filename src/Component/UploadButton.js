import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import "../App.css"

const UploadButton = ({ onDrop }) => {
     const { getRootProps, getInputProps } = useDropzone({ onDrop });

     return (
          <div {...getRootProps()} >
               <input {...getInputProps()} />
               <FontAwesomeIcon className='btn-icon' icon={faImage} />
               <p className='btn-text'>Add Images</p>
          </div>
     );
}

export default UploadButton;