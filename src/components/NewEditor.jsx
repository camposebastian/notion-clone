import { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa6";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Trash2 } from "lucide-react";

function NewEditor({ id, components, addEditor, removeEditor, updateEditorContent, initialContent }) {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const validateComponent = () => {
    if (selectedComponent !== null) {
      addEditor();
    }
  };

  const selectComponent = (component) => {
    setSelectedComponent(component);
    //updateEditorContent(id, "" );
  };

  return (
    <>
      <div>
        <div className="flex px-[10px] py-[15px] items-center gap-2">
          {selectedComponent !== null && (
            <div className="relative inline-block text-left mb-auto">
            <div>
              <button
                onClick={() => validateComponent(null)}
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                <FaPlus className="text-[#b5b5b5] w-4" />
              </button>
            </div>
           </div>
          )}
          {selectedComponent === null && (
            <Menu as="div" className="relative inline-block text-left mb-auto">
              <div>
                <MenuButton                  
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <FaPlus className="text-[#b5b5b5] w-4" />
                </MenuButton>
              </div>

              <Menu.Items className="absolute z-10 w-[200px] text-sm mt-2 origin-top-right bg-white border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {components.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <button
                        onClick={() => selectComponent(item)}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } flex items-center w-full px-4 py-2 text-left`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.name}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          )}
          {selectedComponent && (
            <Menu as="div" className="relative inline-block text-left mb-auto">
              <div>
                <MenuButton
                  onClick={() => removeEditor(id)}
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <Trash2 className="text-[#b5b5b5] w-4" />
                </MenuButton>
              </div>
            </Menu>
          )}
          <div className="w-full">
            {selectedComponent && (
              <div>
                <selectedComponent.component id={id} updateEditorContent={updateEditorContent} />
              </div>
            )}
            {!selectedComponent && (
              <i className="text-[#b5b5b5]">Click plus icon '+' to add</i>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewEditor;
