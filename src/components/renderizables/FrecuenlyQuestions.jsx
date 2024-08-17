"use client";

import { Description } from "@headlessui/react";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Image from "next/image";

function FrecuenlyQuestions() {
  const [frecuentQuestions, setFrecuentQuestions] = useState([
    {
      id: 1,
      title: "Frequently Asked Questions 1",
      response: "Response 1",
      type: "AI Generated",
      created: "Aug 1, 2024 12:02 PM",
    },
    {
      id: 2,
      title: "Frequently Asked Questions 2",
      response: "Response 2",
      type: "AI Generated",
      created: "Aug 1, 2024 12:02 PM",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  const handleAddQuestion = () => {
    console.log("add")

    const newFrecuentQuestions = [...frecuentQuestions];
    const newId = newFrecuentQuestions.length + 1;
    newFrecuentQuestions.push({
      id: newId,
      title: `adding new ${newId}`,
      response: `Response ${newId}`,
      type: "AI Generated",
      created: "Aug 1, 2024 12:02 PM",
    });
    setFrecuentQuestions(newFrecuentQuestions);
  }

  const handleEditQuestion = (id) => {
    console.log("edit " + id)
  }

  const handleDeleteQuestion = (id) => {
    console.log("delete " + id);

    const newFrecuentQuestions = [...frecuentQuestions];
    newFrecuentQuestions.splice(id, 1);
    setFrecuentQuestions(newFrecuentQuestions);
  }

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
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="justify-center rounded-lg border border border-gray-900/25 px-6 py-6">
          <div className="pb-4 flex flex-wrap items-center justify-between max-w-screen-xl m-auto mx-auto gap-y-2 border-b-2 border-[#eaeaea]">
            <div>
              <h2 className="font-bold">
                {" "}
                <b>Topic</b> - Frequently Asked Questions
              </h2>
            </div>
            <div className="flex gap-x-4">
              <p className="border rounded-full py-2 px-4 bg-[#eaeaea] text-[#4f4f4f] font-bold text-sm content-center">
                20 Questions
              </p>
              <button
                onClick={togglePopup}
                className="border rounded-full py-2 px-4 border-black font-bold text-sm content-center"
              >
                Manage
              </button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 py-4 border-b-2 border-[#eaeaea] text-[#4f4f4f] font-bold text-sm">
            <div className="col-span-4">
              <p>Question</p>
            </div>
            <div className="col-span-1">
              <p>Type</p>
            </div>
            <div className="col-span-1">
              <p>Created</p>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
          {frecuentQuestions.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-6 gap-4 py-4 border-b-2 border-[#eaeaea] font-bold text-sm"
            >
              <div className="col-span-4">
                <p>{item.title}</p>
              </div>
              <div className="col-span-1">
                <p>{item.type}</p>
              </div>
              <div className="col-span-1">
                <p>{item.created}</p>
              </div>
            </div>
          ))}
          </div>
          {frecuentQuestions.length === 0 && (
            <p className="text-center text-gray-500">No records found</p>
          )}
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
            <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-6xl">
              <div className="justify-center">
                <div className="pb-4 flex flex-wrap items-center justify-between max-w-screen-xl m-auto mx-auto gap-y-2 border-b-2 border-[#eaeaea]">
                  <div>
                    <h2 className="font-bold">
                      {" "}
                      <b>Topic</b> - Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="flex gap-x-4">
                    <button
                        onClick={handleAddQuestion}
                        className="border rounded-full py-2 px-4 bg-black text-white font-bold text-sm content-center"
                    >
                        Add a Question
                    </button>                    
                    <button
                      onClick={togglePopup}
                      className="border-2 rounded-full py-1 px-3 border-black font-bold text-md content-center"
                    >
                      X
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4 py-4 border-b-2 border-[#eaeaea] text-[#4f4f4f] font-bold text-sm">
                  <div className="col-span-3">
                    <p>Question</p>
                  </div>
                  <div className="col-span-1">
                    <p>Type</p>
                  </div>
                  <div className="col-span-1">
                    <p>Created</p>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">

                
                {frecuentQuestions.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-6 gap-4 py-4 border-b-2 border-[#eaeaea] font-bold text-sm"
                  >
                    <div className="col-span-3">
                      <p>{item.title}</p>
                      <p className="font-normal text-black truncate">{item.response}</p>
                    </div>
                    <div className="col-span-1 content-center">
                      <p>{item.type}</p>
                    </div>
                    <div className="col-span-1 content-center">
                      <p>{item.created}</p>
                    </div>
                    <div className="col-span-1 flex m-auto gap-x-4">   
                        <span className="text-black group-hover:text-black group-hover:bg-white rounded-md cursor-pointer transition duration-300 content-center">                   
                        <FaPen
                            onClick={() => handleEditQuestion(item.id)} 
                            className="w-4 h-4" 
                        />
                        </span>
                      <span className="text-black group-hover:text-black group-hover:bg-white rounded-md cursor-pointer transition duration-300 ">
                        <MdDeleteForever
                          onClick={() => handleDeleteQuestion(item.id)}
                          className="w-6 h-6"
                        />
                      </span>
                    </div>
                  </div>
                ))}
                {frecuentQuestions.length === 0 && (
                  <p className="text-center text-gray-500">No records found</p>
                )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FrecuenlyQuestions;
