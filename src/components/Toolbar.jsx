import { useRef, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Icon, ImageIcon, Smile, X } from "lucide-react"
import IconPicker from "./IconPicker"
import { Button } from "./ui/button"
import ReactTextareaAutosize from "react-textarea-autosize"
import { useCoverImageStore } from "../../hooks/useCoverImage"

function Toolbar({initialData, preview}) {

    const inputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const coverImage = useCoverImageStore();

    const enableInput = () => {
        if(preview) return;
        
        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current.focus();            
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onInput = (value) => {
        setValue(value);
        update({ id: initialData._id, title: value || "Untitled" });
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon) => {        
        update({ id: initialData._id, icon: icon });
    };

    const onRemoveIcon = () => {
        removeIcon({ id: initialData._id });
    };

  return (
    <div className="pl-[54px] group relative">
        {initialData.icon && !preview && (
            <div className="flex items-center gap-x-2 group/icon pt-6">
                <IconPicker onChange={onIconSelect}>
                    <p className="text-6xl hover:opacity-75 transition">{initialData.icon}</p>
                </IconPicker> 
                <Button
                    onClick={onRemoveIcon}
                    className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                    variant="outline"
                    size="icon"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        )}
        {initialData.icon && preview &&(
            <p className="text-6xl pt-6">
                {initialData.icon}
            </p>
        )}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
            {!initialData.icon && !preview && (
                <IconPicker asChild onChange={onIconSelect}>
                    <Button variant="outline" size="sm" className="text-muted-foreground text-xs">
                        <Smile className="w-4 h-4 mr-2" />
                        Add icon
                    </Button>
                </IconPicker>
            )}
            {!initialData.converImage && !preview &&(
                <Button 
                onClick={coverImage.onOpen}
                variant="outline"
                 size="sm"
                  className="text-muted-foreground text-xs"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Add cover
                </Button>
            )}
        </div>
        {isEditing && !preview ? (
            <ReactTextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] resize-none"
            />
        ):(
            <div
            onClick={enableInput}
            className="pb-[11.5px] text-5xl font-bold break-words text-[#3f3f3f] outline-none text-[#3f3f3f] resize-none"
            >
                {initialData.title || "Untitled"}
            </div>
        )}
    </div>
  )
}

export default Toolbar