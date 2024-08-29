import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Image from "next/image";

const GalleryComponent = (props) => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      newImages.push({
        file: files[i],
        url: URL.createObjectURL(files[i]),
        description: "",
      });
    }
    setImages(newImages);
  };

  const handleEditPictures = () => {
    setIsOpen(!isOpen);
  };

  const hadleDeletePicture = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleUpdateDescription = (index, description) => {
    const newImages = [...images];
    newImages[index].description = description;
    setImages(newImages);
  };

  const handleUpdatePicture = (index) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = {
        ...newImages[index],
        file: file,
        url: URL.createObjectURL(file),
      };
      setImages(newImages);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 my-4 mx-2">
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
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-dark outline-none"
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
            className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer"
          >
            <div className="relative w-full h-[12rem] overflow-hidden flex position-relative">
              {images.map((image, index) => (
                <Image
                  key={index}
                  className={`border border-black w-[20rem] h-[12rem] absolute bg-white`}
                  style={{ left: `${index * 6}rem` }}
                  src={image.url}
                  alt={`Preview ${index}`}
                  width={320} // Añadido
                  height={192} // Añadido
                  objectFit="cover" // Añadido
                />
              ))}
            </div>
          </div>
        )}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
            <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-5xl">
              <button
                onClick={togglePopup}
                className="absolute top-2 right-4 text-xl text-black rounded-full p-2 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Room Photos Gallery</h2>
              <div className="grid grid-cols-3 gap-8">
                {images.map((image, index) => (
                  <div key={index} className="border border-[#a7a7a7]">
                    <div className="border-b border-[#a7a7a7] p-2 group relative content-center h-[13rem] overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.description}
                        className="max-h-[12rem] m-auto w-full h-full"
                        width={320} // Añadido
                        height={192} // Añadido
                        objectFit="cover" // Añadido
                      />
                      <span className="text-[#ffffff00] group-hover:text-black group-hover:bg-white rounded-md absolute bottom-4 left-4 cursor-pointer transition duration-300 ">
                        <MdDeleteForever
                          onClick={() => hadleDeletePicture(index)}
                          className="w-8 h-8"
                        />
                      </span>

                      <label
                        htmlFor={`file-update-${index}`}
                        className="text-[#ffffff00] group-hover:text-black group-hover:bg-white rounded-md absolute bottom-4 left-16 p-2 cursor-pointer transition duration-300"
                      >
                        <input
                          id={`file-update-${index}`}
                          type="file"
                          className="hidden"
                          onChange={handleUpdatePicture(index)}
                        />
                        <FaPen className="w-4 h-4" />
                      </label>
                    </div>
                    <input
                      className="w-full p-3 outline-none"
                      type="text"
                      name=""
                      id=""
                      value={image.description}
                      onChange={(e) =>
                        handleUpdateDescription(index, e.target.value)
                      }
                      placeholder="Add a description"
                    />
                  </div>
                ))}
                <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center content-center">
                    <p className="mx-auto text-gray-300">
                      <FaCloudUploadAlt className="m-auto w-14 h-14" />
                    </p>
                    <div className="mt-4 flex text-xl leading-6 text-black">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-dark outline-none"
                      >
                        <span>Add more images</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only outline-none"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const GalleryEditor = createReactBlockSpec(
  {
    type: "gallery",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: "none",
  },
  {
    render: (props) => <GalleryComponent {...props} />,
  }
);
