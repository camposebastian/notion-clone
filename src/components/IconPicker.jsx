import EmojiPicker, {Theme} from "emoji-picker-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function IconPicker({onChange, children, asChild}) {

  return (
    <Popover>
        <PopoverTrigger asChild={asChild}>
            {children}
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-none shadow-none">
            <EmojiPicker 
            height={350}
            theme="light"
            onEmojiClick={(data)=>onChange(data.emoji)}
            />
        </PopoverContent>
    </Popover>
  )
}

export default IconPicker