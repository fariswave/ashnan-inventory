import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, "Input your product name"),
  unit: z.enum(["PCS", "G", "KG", "ML", "L"]),
});
