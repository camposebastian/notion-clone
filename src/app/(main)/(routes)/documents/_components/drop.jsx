import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuDemo() {
  return (
    <>
      <div>
        <div className="flex px-[10px] py-[15px] items-center	gap-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                <FaPlus className="text-[#b5b5b5]" /> {/* cursor-pointer hover:bg-[#b5b5b545] w-[1.2rem] h-[1.2rem] p-[3px] rounded */}
                {/* Options
                <FaPlus
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                /> */}
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-[9999] mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Account settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Support
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    License
                  </a>
                </MenuItem>
                <form action="#" method="POST">
                  <MenuItem>
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </Menu>          
          <div className="w-full">
            <i className="text-[#b5b5b5]">Click plus icon '+' to add</i>{" "}
            {/* renderizar aqui el componente seleccionado */}
          </div>
        </div>
      </div>
    </>
  );
}
