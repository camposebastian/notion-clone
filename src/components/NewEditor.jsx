import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

/* componentes */
import ParagraphComponent from "@/components/renderizables/ParagraphComponent";
import H1Component from "@/components/renderizables/H1Component";
import H2Component from "@/components/renderizables/H2Component";
import TextComponent from "@/components/renderizables/TextComponent";
import ImageGallery from "@/components/renderizables/ImageGallery";
import ImageUnique from "@/components/renderizables/ImageUnique";
import {  ChevronDown,  ChevronUp,  Image,  Type,  Heading1,  Heading2,  AlignLeft,} from "lucide-react";


function NewEditor() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const components = [
    { name: "Galería de Imágenes", icon: Image, component: ImageGallery },
    { name: "Imagen unica", icon: Image, component: ImageUnique },
    { name: "Texto", icon: Type, component: TextComponent },
    { name: "H1", icon: Heading1, component: H1Component },
    { name: "H2", icon: Heading2, component: H2Component },
    { name: "Párrafo", icon: AlignLeft, component: ParagraphComponent },
  ];

  return (
    <>
      <div>
        <div className="flex px-[10px] py-[15px] items-center gap-2">
          <Menu as="div" className="relative inline-block text-left mb-auto">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                <FaPlus className="text-[#b5b5b5]" />{" "}
                {/* cursor-pointer hover:bg-[#b5b5b545] w-[1.2rem] h-[1.2rem] p-[3px] rounded */}
                {/* Options
                <FaPlus
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                /> */}
              </MenuButton>
            </div>

            <Menu.Items className="absolute z-10 w-[200px] text-sm mt-2 origin-top-right bg-white border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {components.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedComponent(item)}
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
          <div className="w-full">
            {selectedComponent && (
              <div>
                <selectedComponent.component />
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
