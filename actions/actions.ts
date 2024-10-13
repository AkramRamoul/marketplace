"use server";
class UserNotFoundError extends Error {}

import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type categoryTypes } from "@prisma/client";
import { z } from "zod";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};
const productSchema = z.object({
  name: z.string().min(3, { message: "Name has to be at least 3 carachters" }),
  category: z.string().min(1, { message: "Category is requiered" }),
  price: z.number().min(1, { message: "Price is required" }),
  smallDescription: z
    .string()
    .min(10, { message: "Enter at least 10 carachters" }),
  descrpition: z.string().min(10, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Please add images" }),
  productFile: z.string().min(1, { message: "Please add files" }),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new UserNotFoundError("UnAutherized");
  }

  const validate = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    descrpition: formData.get("descrpition"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validate.success) {
    const state: State = {
      status: "error",
      errors: validate.error.flatten().fieldErrors,
      message: "wrong inputs ",
    };
    return state;
  }

  await prisma.product.create({
    data: {
      name: validate.data.name,
      category: validate.data.category as categoryTypes,
      smallDescription: validate.data.smallDescription,
      price: validate.data.price,
      images: validate.data.images,
      productFile: validate.data.productFile,
      userId: user.id,
      description: JSON.parse(validate.data.descrpition),
    },
  });

  const state: State = {
    status: "success",
    message: "Your product has been Created !",
  };

  return state;
}

export const getUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
    },
  });
  return data;
};

const userSettingSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name has to be at least 3 carachters" })
    .or(z.literal(""))
    .optional(),
  lastName: z
    .string()
    .min(3, { message: "Last name has to be at least 3 carachters" })
    .or(z.literal(""))
    .optional(),
});

export const UpdateUserData = async (prevState: any, formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const validate = userSettingSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validate.success) {
    const state: State = {
      status: "error",
      errors: validate.error.flatten().fieldErrors,
      message: "Check the information you entered",
    };
    return state;
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validate.data.firstName,
      lastName: validate.data.lastName,
    },
  });
  const state: State = {
    status: "success",
    message: "Information updated successfully",
  };
  return state;
};

export const GetData = async () => {
  const data = await prisma.product.findMany({
    select: {
      price: true,
      smallDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    data,
    title: "Newest Products",
    link: "/products/all",
  };
};

export const GetProductById = async (id: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return data;
};

export const GetProductByCategory = async (category: string) => {
  const data = await prisma.product.findMany({
    where: {
      category: category as categoryTypes,
    },
    select: {
      price: true,
      smallDescription: true,
      name: true,
      id: true,
      images: true,
    },
  });
  return {
    data,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)}s`,
    link: `/products/${category}`,
  };
};

export const GetProductBycat = async (category: string) => {
  const data = await prisma.product.findMany({
    where: {
      category: category as categoryTypes,
    },
    select: {
      price: true,
      smallDescription: true,
      name: true,
      id: true,
      images: true,
    },
  });
  return data;
};

export const GetUserProducts = async (userId: string) => {
  const data = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    select: {
      category: true,
      name: true,
      images: true,
      price: true,
      smallDescription: true,
      id: true,
    },
  });
  return data;
};
