import { prisma } from "@/lib/prisma";

export async function createDelivery(details: any) {
  return await prisma.delivery.create({
    data: {
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      phoneNumber: details.phone_number,
      city: details.city,
      address: details.address,
     
    },
  });
}
