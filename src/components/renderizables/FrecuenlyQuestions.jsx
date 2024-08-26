"use client";

import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

function FrecuenlyQuestions({ id, updateEditorContent }) {
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
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingResponse, setEditingResponse] = useState("");
  const [createQuestion, setCreateQuestion] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createResponse, setCreateResponse] = useState("");
  const [titleQuestion, setTitleQuestion] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const togglePopup = () => setIsOpen(!isOpen);

  useEffect(() => {
    const savedEditors = JSON.parse(localStorage.getItem('dashboardEditors'));
    if(savedEditors.length > 1){
      let penultimoElemento = savedEditors[savedEditors.length - 2];
      setTitleQuestion(penultimoElemento.content.content);            
    }
  });

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
    handleUpdateQuestion(newFrecuentQuestions);
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
    handleUpdateQuestion(updatedQuestions);
    setEditingId(null); // Salir del modo de edición
  };
  const handleCancelEdit = () => {
    setEditingId(null); // Cancelar la edición
  };

  const handleDeleteQuestion = (id) => {
    console.log("delete " + id);

    const newFrecuentQuestions = frecuentQuestions.filter(
      (question) => question.id !== id
    );
    setFrecuentQuestions(newFrecuentQuestions);

    // Actualizar el editor con el nuevo estado de frecuentQuestions
    handleUpdateQuestion(newFrecuentQuestions);
  };

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);    
  };

  const handleUpdateQuestion = (frecuentQuestions) => {
    updateEditorContent(id, { type: "frecuentQuestions", content: frecuentQuestions, title: titleQuestion ? newTitle : titleQuestion });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="justify-center rounded-lg border border border-gray-900/25 px-6 py-6">
          <div className="pb-4 flex flex-wrap items-center justify-between max-w-screen-xl m-auto mx-auto gap-y-2 border-b-2 border-[#eaeaea]">
            <div>
              <h2 className="font-bold flex">   
                {titleQuestion ? <input className="font-bold outline-none focus:outline-none w-full w-1/3" onChange={handleChangeTitle} value={newTitle} placeholder="Your title here"  /> : titleQuestion}             
                - Frequently Asked Questions
              </h2>
            </div>
            <div className="flex gap-x-4">
              <p className="border rounded-full py-2 px-4 bg-[#eaeaea] text-[#4f4f4f] font-bold text-sm content-center">
                {frecuentQuestions.length} Questions
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
            {/* <div className="col-span-1">
              <p>Type</p>
            </div> */}
            <div className="col-span-2">
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
                {/* <div className="col-span-1">
                  <p>{item.type}</p>
                </div> */}
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
                <div className="pb-4 flex flex-wrap items-center justify-between max-w-screen-xl m-auto mx-auto gap-y-2 border-b-2 border-[#eaeaea] gap-x-4">
                  <div>
                    <h2 className="font-bold">
                      {" "}
                      <b>Topic</b> - Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="flex gap-x-4">                    
                    {!createQuestion && (
                      <button
                        onClick={handleAddQuestion}
                        className="border rounded-full py-2 px-4 bg-black text-white font-bold text-sm content-center"
                      >
                        Add a Question
                      </button>
                    )}

                    <button
                      onClick={togglePopup}
                      className="border-2 rounded-full py-1 px-3 border-black font-bold text-md content-center"
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
                        className="py-4 col-span-6 w-[950px]" /* 60rem */
                      >
                        <input
                          type="text"
                          placeholder="Question"
                          value={createTitle}
                          onChange={(e) => setCreateTitle(e.target.value)}
                          className="w-full border rounded px-2 py-1 mb-2"
                        />
                        <textarea
                          value={createResponse}
                          placeholder="Response"
                          onChange={(e) => setCreateResponse(e.target.value)}
                          className="w-full border rounded px-2 py-1"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={handleSaveCreate}
                            className="bg-black text-white px-4 py-2 rounded"
                          >
                            Add a Question
                          </button>
                          <button
                            onClick={handleCancelCreate}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-6 gap-4 py-4 border-b-2 border-[#eaeaea] text-[#4f4f4f] font-bold text-sm">
                        <div className="col-span-4">
                          <p>Question</p>
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
                              <span className="text-black group-hover:text-black group-hover:bg-white rounded-md cursor-pointer transition duration-300">
                                <MdDeleteForever
                                  onClick={() => handleDeleteQuestion(item.id)}
                                  className="w-6 h-6"
                                />
                              </span>
                            </div>
                          </div>
                        ))}
                        {frecuentQuestions.length === 0 && (
                          <p className="text-center text-gray-500">
                            No records found
                          </p>
                        )}
                      </div>
                    </>
                  )}                
              </div>
            </div>
          </div>
        )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default FrecuenlyQuestions;
