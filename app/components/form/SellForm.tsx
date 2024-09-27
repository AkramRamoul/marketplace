"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, type State } from "@/actions/actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import SelectCategory from "../SelectCategory";
import { TiptapEditor } from "../Editor";
import { UploadDropzone } from "@/app/lib/uploadthing";
import SubmnitButton from "../SubmnitButton";

function SellForm() {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<JSONContent | null>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [file, setFile] = useState<null | string>(null);
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      redirect("/");
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.message, state.status]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Sell you product</CardTitle>
        <CardDescription>Describe your product</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label className="text-xl">Title</Label>
          <Input
            name="name"
            type="text"
            placeholder="Name of your product"
            required
            minLength={3}
          />
          {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-xl">Category</Label>
          <SelectCategory />
          {state?.errors?.["category"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["category"]?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 ">
          <Label>Price</Label>
          <Input placeholder="0$" type="number" name="price" required min={1} />
          {state?.errors?.["price"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Small summary</Label>
          <Textarea
            placeholder="Type your summary here."
            maxLength={50}
            name="smallDescription"
            required
            minLength={10}
          />
          {state?.errors?.["smallDescription"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["smallDescription"]?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2 ">
          <input
            type="hidden"
            name="descrpition"
            value={JSON.stringify(json)}
          />
          <Label>desciption</Label>
          <TiptapEditor json={json} setJson={setJson} />
          {state?.errors?.["descrpition"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["descrpition"]?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <input name="images" type="hidden" value={JSON.stringify(images)} />
          <Label>Product Images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((item) => item.url));
              toast.success("Your images have been uploaded");
            }}
            onUploadError={() => {
              toast.error("error uploading images");
            }}
          />
          {state?.errors?.["images"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="productFile" value={file ?? ""} />
          <Label>Product Files</Label>
          <UploadDropzone
            endpoint="producFiles"
            onClientUploadComplete={(res) => {
              setFile(res[0].url);
              toast.success("Your file has been uploaded");
            }}
            onUploadError={() => {
              toast.error("error uploading file");
            }}
          />
          {state?.errors?.["productFile"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["productFile"]?.[0]}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-5 ">
        <SubmnitButton title="Create Product" />
      </CardFooter>
    </form>
  );
}

export default SellForm;
