"use server";

import { handleError } from "@/lib/utils";
import { AddImageParams, UpdateImageParams } from "@/types";
import { connectToDatabase } from "../../mongoose";
import { revalidatePath } from "next/cache";
import User from "../user.model";
import Image from "../image.model";
import { redirect } from "next/navigation";
import path from "path";

const populateUser = (query: any) =>
  query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName",
  });

//Add Image
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDatabase();
    const author = await User.findById(userId);
    if (!author) {
      throw new Error("User not found");
    }

    const newImage = await Image.create({
      ...image,
      author: author._id,
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

//Update Image
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Image not found or user not authorized");
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);
    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

//Delete Image
export async function deleteImage(imageId: string) {
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

//GetImage
export async function getImage(imageId: string) {
  try {
    await connectToDatabase();

    const image = await populateUser(Image.findById(imageId));

    if (!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}