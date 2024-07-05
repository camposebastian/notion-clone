"use client";

import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  PlusIcon,
  Plus,
  MoreHorizontal,
  Trash
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  documentIcon,
  active,
  expanded,
  isSearch,
  level,
  onExpand,
}) => {
    const {user} = useUser()
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const onArchive = (e) => {
    e.stopPropagation();
    if (!id) return;
    const promise = archive({id});
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash",
      error: "Could not move to trash",
    });
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    onExpand?.();
  };

  const onCreate = (e) => {
    e.stopPropagation();
    const promise = create({
      title: "Untitled",
      parentDocument: id,
    }).then((documentId) => {
      if (!expanded) {
        onExpand?.();
      }
      //router.push(`/documents/${documentId}`);
    });
    toast.promise(promise, {
      loading: "Creating a note...",
      success: "Note created",
      error: "Could not create a new note",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      /* style={{
        paddingLeft:
          level === undefined || level.length === 0
            ? "12px"
            : `${level * 12 + 12}px`,
      }} */
      style={{
        paddingLeft: "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground",
        active && "bg-primary/5 text-primary"
      )}
    >
      {/* {!id && ( */}
      { id &&
      (<div
        role="button"
        className="h-full rounded-sm hover:bg-neutral-300"
        onClick={handleExpand}
      >
        {expanded ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        )}
        {/* <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" /> */}
      </div>)
      }
      {/* )} */}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-event-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
          <span className="text-xs">Ctrl +</span>K
        </kbd>
      )}
      {id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => {
                e.stopPropagation();
              }}
              asChild
            >
                <div 
                    role="button"
                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 "
                >
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-60"
            align="start"
            side="right"
            forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <div className="text-xs text-muted-foreground p-2">
                    Last edited by {user.fullName}
                    </div>
                </DropdownMenuItem>                                
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton(level) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-3"
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-[30%] h-4" />
    </div>
  );
};
