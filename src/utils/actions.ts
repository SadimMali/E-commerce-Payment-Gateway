"use server";

import { UserFormValues } from "@/components/user/UserProfile";
import { prisma } from "@/lib/prisma";

type CurrentState = {
  success: boolean;
  error: boolean;
};

export async function updateUser(
  currentState: CurrentState,
  data: UserFormValues
) {
  try {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}
