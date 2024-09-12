"use client";

import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FaqComponent = (props) => {
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

  const [searchQuestion, setSearchQuestion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingResponse, setEditingResponse] = useState("");
  const [createQuestion, setCreateQuestion] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createResponse, setCreateResponse] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [toggleId, setToggleId] = useState(null);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const handleAddQuestion = () => {
    setEditingId(null);
    setCreateQuestion(true);
  };
  const handleSaveCreate = () => {
    const newFrecuentQuestions = [...frecuentQuestions];
    const newId = newFrecuentQuestions.length + 1;
    newFrecuentQuestions.push({
      id: newId,
      title: createTitle,
      response: createResponse,
      type: "Create",
      created: "Aug 1, 2024 12:02 PM",
    });
    setFrecuentQuestions(newFrecuentQuestions);

    setCreateQuestion(false);
    setCreateTitle("");
    setCreateResponse("");
  };
  const handleCancelCreate = () => {
    setCreateQuestion(false);
  };

  const handleEditQuestion = (id) => {
    const questionToEdit = frecuentQuestions.find(
      (question) => question.id === id
    );
    setEditingId(id);
    setEditingTitle(questionToEdit.title);
    setEditingResponse(questionToEdit.response);
  };
  const handleSaveEdit = () => {
    const updatedQuestions = frecuentQuestions.map((question) =>
      question.id === editingId
        ? { ...question, title: editingTitle, response: editingResponse }
        : question
    );
    setFrecuentQuestions(updatedQuestions);

    setEditingId(null); // Salir del modo de edición
  };
  const handleCancelEdit = () => {
    setEditingId(null); // Cancelar la edición
  };

  const handleDeleteQuestion = (id) => {
    const newFrecuentQuestions = frecuentQuestions.filter(
      (question) => question.id !== id
    );
    setFrecuentQuestions(newFrecuentQuestions);
  };

  const handleSetToDelete = (id) => {
    setQuestionToDelete(id);
  };

  const handleRemoveToDelete = () => {
    setQuestionToDelete(null);
  };

  const handleDeleteAll = () => {
    setFrecuentQuestions([]);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);

    if (searchTerm === "") {
      setSearchQuestion([]);
    } else {
      const filteredQuestions = frecuentQuestions.filter((question) =>
        question.title.toLowerCase().includes(searchTerm)
      );
      setSearchQuestion(filteredQuestions);
      console.log(filteredQuestions);
    }
  };

  const handleToggleDisplay = (id) => {
    setToggleId(id);
  };

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 my-4 mx-2 w-full">
        <div className="justify-center rounded-lg border border border-gray-900/25 px-6 py-6">
          <div className="pb-4 flex flex-wrap items-center justify-between max-w-screen-xl m-auto mx-auto gap-y-2 border-b-2 border-[#eaeaea]">
            <div>
              <h2 className="font-bold flex">
                {/* <span ref={props.contentRef} /> */}{" "}
                <span className="font-black pr-2">Topic</span> Frequently Asked
                Questions
              </h2>
            </div>
            <div className="flex gap-x-4">
              <span className="block border rounded-full py-2 px-6 bg-[#eaeaea] text-[#4f4f4f] font-bold text-sm content-center">
                <Image src="/icons/questionnaire-line.png" width={20} height={20} className="inline-block" alt="icon" /> {frecuentQuestions.length} Questions
              </span>
              <button
                onClick={() => {
                  togglePopup();
                }}
                className="border rounded-full py-2 px-6 border-black font-bold text-sm content-center"
              >
                Manage
              </button>
              <button
                onClick={() => {
                  handleDeleteAll();
                }}
                className="border rounded-full py-2 px-6 border-black font-bold text-sm content-center"
              >
                Delete All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 py-4 border-b-2 border-[#eaeaea] text-[#898989] font-bold text-sm">
            <div className="col-span-4">
              <p><Image src="/icons/questionnaire-line.png" width={20} height={20} className="inline-block" alt="icon" /> Question</p>
            </div>
            <div className="col-span-2">
              <p> <Image src="/icons/time-line.png" width={20} height={20} className="inline-block" alt="icon" /> Created</p>
            </div>
          </div>
          <div className="max-h-32 overflow-y-auto">
            {frecuentQuestions.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 gap-4 py-4 border-b-2 border-[#eaeaea] font-bold text-sm"
              >
                <div className="col-span-4">
                  <p>{item.title}</p>
                </div>
                <div className="col-span-2">
                  <p>{item.created}</p>
                </div>
              </div>
            ))}
          </div>
          {frecuentQuestions.length === 0 && (
            <p className="text-center text-gray-500">No records found</p>
          )}
        </div>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
              <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-6xl">
                <div className="justify-center">
                  <div className="pb-4 flex flex-wrap items-center justify-between max-w-screen-xl m-auto mx-auto gap-y-2 gap-x-4">
                    <div>
                      <h2 className="font-bold">
                        <b>Topic</b> - Frequently Asked Questions
                      </h2>
                    </div>
                    <div className="flex gap-x-4">
                      {!createQuestion && (
                        <>
                          <span className="block border rounded-full py-2 px-6 border-[#eaeaea] bg-white text-[#4f4f4f] font-bold text-sm content-center">
                            {frecuentQuestions.length} Questions
                          </span>
                          {!createQuestion && (
                            <button
                              onClick={handleAddQuestion}
                              className="border rounded-full py-2 px-4 bg-black text-white font-bold text-sm content-center"
                            >
                              <FaPlus color="white" className="text-white inline-block mr-2" />

                              {/* <Image src="/icons/add-line.png" width={20} height={20} className="inline-block" alt="icon" />  */}
                              Add a New
                            </button>
                          )}
                          <input
                            type="text"
                            placeholder="Search"
                            onChange={handleSearch}
                            className="w-[15rem] border border-[#eaeaea] bg-[#eaeaea] rounded-full px-3 py-1"
                          />
                        </>
                      )}

                      <button
                        onClick={togglePopup}
                        className="border-2 rounded-full py-1 px-3 border-black font-black text-md content-center"
                      >
                        X
                      </button>
                    </div>
                  </div>
                  {createQuestion ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="col-span-6 w-[54rem]"
                      >
                        <>
                          <span className="font-black text-black pb-2 block">
                            Question
                          </span>
                          <input
                            type="text"
                            value={createTitle}
                            onChange={(e) => setCreateTitle(e.target.value)}
                            placeholder="Question"
                            className="w-full border rounded-lg bg-[#eaeaea] px-2 py-4 mb-2"
                          />

                          <div className="flex justify-between mb-2">
                            <span className="text-left font-black text-black block content-center">
                              Answer
                            </span>
                            <span className="text-right font-semibold text-black py-1 px-8 block border rounded-xl b-[#eaeaea] cursor-pointer text-sm">
                              Suggest
                            </span>                            
                          </div>
                          
                          <textarea
                            value={createResponse}
                            placeholder="Response"
                            onChange={(e) => setCreateResponse(e.target.value)}
                            className="w-full border rounded-lg bg-[#eaeaea] px-2 py-1"
                          />
                          
                          <div className="flex justify-center gap-2 mt-2">
                            <button
                              disabled={!createTitle || !createResponse}
                              onClick={handleSaveCreate}
                              className="bg-black text-white px-6 py-2 rounded-full"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelCreate}
                              className="bg-white border border-black text-black px-6 py-2 rounded-full"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <div className="max-h-96 min-h-40 overflow-y-auto">
                        {frecuentQuestions.length === 0 && (
                          <p className="text-center text-gray-500">
                            No records found
                          </p>
                        )}
                        {searchQuestion.length > 0
                          ? searchQuestion.map((item) => (
                              <div
                                key={item.id}
                                className="grid grid-cols-6 gap-4 py-4 border-b-2 border-[#eaeaea] font-bold text-sm"
                              >
                                <div className="col-span-5">
                                  {editingId === item.id ? (
                                    <>
                                      <input
                                        type="text"
                                        value={editingTitle}
                                        onChange={(e) =>
                                          setEditingTitle(e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1 mb-2"
                                      />
                                      <textarea
                                        value={editingResponse}
                                        onChange={(e) =>
                                          setEditingResponse(e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1"
                                      />
                                      <div className="flex justify-end gap-2 mt-2">
                                        <button
                                          onClick={handleSaveEdit}
                                          className="bg-black text-white px-4 py-2 rounded"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={handleCancelEdit}
                                          className="bg-gray-500 text-white px-4 py-2 rounded"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <p>{item.title}</p>
                                      <p className="font-normal text-black truncate">
                                        {item.response}
                                      </p>
                                    </>
                                  )}
                                </div>

                                <div className="col-span-1 flex m-auto gap-x-4">
                                  <span className="text-black group-hover:text-black group-hover:bg-white rounded-md cursor-pointer transition duration-300 content-center">
                                    <FaPen
                                      onClick={() =>
                                        handleEditQuestion(item.id)
                                      }
                                      className="w-4 h-4"
                                    />
                                  </span>
                                  <span className="text-black group-hover:text-black group-hover:bg-white rounded-md cursor-pointer transition duration-300">
                                    <MdDeleteForever
                                      onClick={() =>
                                        handleSetToDelete(item.id)
                                      }
                                      className="w-6 h-6"
                                    />
                                  </span>
                                </div>
                              </div>
                            ))
                          : frecuentQuestions.map((item) => (    
                            questionToDelete === item.id ? (                        
                              <div
                            key={item.id}
                            className="grid grid-cols-6 gap-4 px-3 py-4 border rounded-lg border-[#eaeaea] bg-[#eaeaea] font-bold text-sm my-3"
                          >
                              <>
                                <div className="col-span-4 content-center">
                                  <p className="font-bold text-black">Are you sure you want to delete this question?</p>                                  
                                </div>
                                <div className="col-span-2 flex m-auto gap-x-4">
                                  <span className="py-1 px-8 bg-black text-white rounded-md cursor-pointer"
                                  onClick={() =>
                                    handleDeleteQuestion(item.id)
                                  }
                                  >Yes</span>

                                  <span className="py-1 px-8 bg-black text-white rounded-md cursor-pointer"
                                  onClick={() =>
                                    handleRemoveToDelete(item.id)
                                  }
                                  >No</span>
                                                                    
                                </div>
                              </>                           
                            </div>
                            ) : <div
                            key={item.id}
                            className="grid grid-cols-6 gap-4 px-3 py-4 border rounded-lg border-[#eaeaea] font-bold text-sm my-3"
                          >
                            {editingId === item.id ? (
                              <div
                                className="col-span-6 cursor-pointer"
                              >
                                <>
                                  <span className="font-black text-black pb-2 block">
                                    Question
                                  </span>
                                  <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) =>
                                      setEditingTitle(e.target.value)
                                    }
                                    className="w-full border rounded-lg bg-[#eaeaea] px-2 py-4 mb-2"
                                  />

                                  <span className="font-black text-black pb-2 block">
                                    Answer
                                  </span>
                                  <textarea
                                    value={editingResponse}
                                    onChange={(e) =>
                                      setEditingResponse(e.target.value)
                                    }
                                    className="w-full border rounded-lg bg-[#eaeaea] px-2 py-1"
                                  />
                                  <div className="flex justify-center gap-2 mt-2">
                                    <button
                                      onClick={handleSaveEdit}
                                      className="bg-black text-white px-6 py-2 rounded-full"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      className="bg-white border border-black text-black px-6 py-2 rounded-full"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </>
                              </div>
                            ) : (
                              <>
                                <div
                                  className="col-span-5 cursor-pointer"
                                  onClick={() =>
                                    handleToggleDisplay(item.id)
                                  }
                                >
                                  <p className="font-bold">{item.title}</p>
                                  <div
                                    className={`${toggleId === item.id ? "" : "truncate"} font-normal text-black pt-2`}
                                  >
                                    {item.response}
                                  </div>
                                </div>
                                <div className="col-span-1 flex m-auto gap-x-4">
                                  <span className="text-black group-hover:text-black group-hover:bg-white rounded-md cursor-pointer transition duration-300 content-center">
                                    <FaPen
                                      onClick={() =>
                                        handleEditQuestion(item.id)
                                      }
                                      className="w-4 h-4"
                                    />
                                  </span>
                                  <span className="text-black group-hover:text-black group-hover:bg-white rounded-md cursor-pointer transition duration-300">
                                    <MdDeleteForever
                                      onClick={() =>
                                        handleSetToDelete(item.id)
                                      }
                                      className="w-6 h-6"
                                    />
                                  </span>
                                </div>
                              </>
                            )}                                
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const FaqEditor = createReactBlockSpec(
  {
    type: "faq",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: "none", // inline
  },
  {
    render: (props) => <FaqComponent {...props} />,
  }
);
