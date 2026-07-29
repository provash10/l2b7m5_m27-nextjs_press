"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/lib/types";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createPostAction, updatePostAction } from "../_actions/myPostsActions";

type PostFormDialogProps = {
  mode: "create" | "edit";
  post?: IPost;
};

export function PostFormDialog({ mode, post }: PostFormDialogProps) {
  const [open, setOpen] = useState(false);

  const action =
    mode === "edit" && post
      ? updatePostAction.bind(null, post.id)
      : createPostAction;

  const [state, formAction, pending] = useActionState(action, null) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message ||
          (mode === "edit"
            ? "Post updated successfully"
            : "Post created successfully")
      );
      setOpen(false);
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="outline" size="sm">
            <PencilIcon data-icon="inline-start" />
            Edit
          </Button>
        ) : (
          <Button>
            <PlusIcon data-icon="inline-start" />
            Create Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Post" : "Create Post"}
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={post?.title}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={post?.content}
              required
              className="min-h-32"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              defaultValue={post?.thumbnail ?? ""}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={post?.tags ? post.tags.join(", ") : ""}
              placeholder="tech, sports"
            />
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending
              ? mode === "edit"
                ? "Updating..."
                : "Creating..."
              : mode === "edit"
              ? "Update Post"
              : "Create Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
