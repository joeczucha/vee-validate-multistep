import { object, string, number } from "yup";

const advertSchema = [
  object({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
  }),
  object({
    cost: number().required("Cost is required"),
  }),
];

export { advertSchema };
