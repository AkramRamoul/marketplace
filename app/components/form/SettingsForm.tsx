"use client";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmnitButton from "../SubmnitButton";
import { useFormState } from "react-dom";
import { UpdateUserData } from "@/actions/actions";
import { State } from "@/actions/actions";
import { toast } from "sonner";
import { useEffect } from "react";

interface iAppProps {
  firstName: string;
  lastName: string;
  email: string;
}

function SettingsForm({ firstName, lastName, email }: iAppProps) {
  const initialState: State = { message: "", status: undefined };

  const [state, formAction] = useFormState(UpdateUserData, initialState);
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.message, state.status]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Modify account information</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First name</Label>
          <Input name="firstName" type="text" defaultValue={firstName} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Last name</Label>
          <Input name="lastName" type="text" defaultValue={lastName} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>E-mail</Label>
          <Input name="email" type="email" readOnly defaultValue={email} />
        </div>
      </CardContent>
      <CardFooter>
        <SubmnitButton title="Edit" />
      </CardFooter>
    </form>
  );
}

export default SettingsForm;
