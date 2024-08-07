"use client";

import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function ImageGallery() {
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push({
        file: files[i],
        url: URL.createObjectURL(files[i]),
      });
    }
    console.log(newImages);
    setImages(newImages);
  };

  const handleEditPictures = () => {
    console.log("popup")
  };

  return (
    <>
      {/* <div className="grid grid-cols-3 gap-4">
      <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <p className="mx-auto h-12 w-12 text-gray-300">icon</p>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
      <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <p className="mx-auto h-12 w-12 text-gray-300">icon</p>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
      <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <p className="mx-auto h-12 w-12 text-gray-300">icon</p>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div> */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {images.length === 0 && (
          <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <p className="mx-auto text-gray-300">
                <FaCloudUploadAlt className="m-auto w-14 h-14" />
              </p>
              <div className="mt-4 flex text-xl leading-6 text-black">
                <p className="pr-1">drag and drop your images or </p>
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                >
                  <span>
                    {" "}
                    <b> Browse</b> to choose a file{" "}
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
        {images.length > 0 && (
        <div
          onClick={handleEditPictures} 
         class="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer"
        >
          <div class="relative w-full h-[12rem] overflow-hidden flex position-relative">
            {images.map((image, index) => (
              <img key={index} className={`border border-black w-[20rem] h-[12rem] absolute`} style={{ left: `${index * 6}rem` }} src={image.url} alt={`Preview ${index}`} />
            ))}
            {/* <img className="border border-black w-[20rem] h-[12rem] absolute" src="https://picsum.photos/id/1/200/300" alt="" />
            <img className="border border-black w-[20rem] h-[12rem] absolute left-[6rem]" src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ" alt="" />
            <img className="border border-black w-[20rem] h-[12rem] absolute left-[12rem]" src="https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68" alt="" />
            <img className="border border-black w-[20rem] h-[12rem] absolute left-[18rem]" src="https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ" alt="" />
            <img className="border border-black w-[20rem] h-[12rem] absolute left-[24rem]" src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU" alt="" />   */}
          </div>
        </div>
        )}
      </div>
    </>
  );
}

export default ImageGallery;
