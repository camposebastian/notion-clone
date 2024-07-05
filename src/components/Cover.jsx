import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import { ImageIcon, X } from "lucide-react";
import { useCoverImageStore } from "../../hooks/useCoverImage";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "next/navigation";

function Cover({ url, preview }) {

  const params = useParams();
  const coverImage = useCoverImageStore();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    removeCoverImage({ id: params.documentId });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change cover
          </Button>

          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cover;
