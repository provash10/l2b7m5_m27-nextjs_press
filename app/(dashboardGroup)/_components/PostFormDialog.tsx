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
import { Crown, FileText, Image as ImageIcon, Loader2, PencilIcon, PlusIcon, Sparkles, Tag } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createPost, updatePost } from "../_actions/myPostsActions";

type PostFormDialogProps = {
  mode: "create" | "edit";
  post?: IPost;
};

export function PostFormDialog({ mode, post }: PostFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(post?.isPremium ?? false);

  useEffect(() => {
    if (post) {
      setIsPremium(post.isPremium ?? false);
    }
  }, [post]);

  const action =
    mode === "edit" && post
      ? updatePost.bind(null, post.id,"nextjs")
      : createPost;

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
      // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is intended reaction to the server action's result, not a render loop
      setOpen(false);
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="outline" size="sm" className="gap-1.5 rounded-lg border-border/70 hover:bg-muted transition-all">
            <PencilIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Edit</span>
          </Button>
        ) : (
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 rounded-xl transition-all font-medium">
            <PlusIcon className="h-4 w-4" />
            <span>Create Post</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-2xl p-6 shadow-2xl border border-border/80 bg-card text-card-foreground">
        <DialogHeader className="pb-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              {mode === "edit" ? <PencilIcon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                {mode === "edit" ? "Edit Post" : "Create Post"}
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {mode === "edit" ? "Update your article details below." : "Share your stories and insights with readers."}
              </p>
            </div>
          </div>
        </DialogHeader>

        <form action={formAction} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              Title
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={post?.title}
              placeholder="Enter post title..."
              required
              className="h-10 rounded-xl border-border/60 bg-muted/20 px-3.5 focus:bg-background focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content" className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              Content
            </Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={post?.content}
              placeholder="Write your article content..."
              required
              className="min-h-28 rounded-xl border-border/60 bg-muted/20 px-3.5 py-2.5 focus:bg-background focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="thumbnail" className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                Thumbnail URL
              </Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                defaultValue={post?.thumbnail ?? ""}
                placeholder="https://..."
                className="h-10 rounded-xl border-border/60 bg-muted/20 px-3.5 focus:bg-background focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tags" className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                name="tags"
                defaultValue={post?.tags ? post.tags.join(", ") : ""}
                placeholder="tech, sports"
                className="h-10 rounded-xl border-border/60 bg-muted/20 px-3.5 focus:bg-background focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
              />
            </div>
          </div>

          {/* Premium Content Checkbox Card */}
          <label className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/15 hover:bg-muted/30 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 group-hover:scale-105 transition-transform">
                <Crown className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Mark as premium content</div>
                <div className="text-xs text-muted-foreground">Only premium subscribers can read this</div>
              </div>
            </div>
            <input
              type="checkbox"
              name="isPremium"
              value="true"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-border text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
            />
          </label>

          <Button
            type="submit"
            disabled={pending}
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all gap-2"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{mode === "edit" ? "Updating..." : "Creating..."}</span>
              </>
            ) : (
              <span>{mode === "edit" ? "Update Post" : "Create Post"}</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
