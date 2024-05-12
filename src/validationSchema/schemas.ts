import { z } from "zod";

export const addContactSchema = z.object({
  name: z.string({
    required_error: "name is required",
  }),
  email: z.string().optional(),
  phoneNumber: z.string({
    required_error: "phone number is required",
  }),
  address: z.string({
    required_error: "addess is required",
  }),
  photoUrl: z
    .string({
      required_error: "photo is required",
    })
    .min(3, "Photo is required"),
});
