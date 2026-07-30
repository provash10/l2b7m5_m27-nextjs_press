"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(loginAction, null);

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Login Failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Input name="email" type="email" placeholder="Enter Your Email" required />
        <Input name="password" type="password" placeholder="Enter Your Password" required />
        <Button type="submit" className="w-full">
          {pending ? "Submitting..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;
