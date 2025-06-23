"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaeClient } from "../supabase";

export const createCompanion = async (FormData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaeClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...FormData, author })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create companion");
  }
  return data[0];
};
