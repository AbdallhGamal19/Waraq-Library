import Joi from "joi";

// Custom validation function to check for null values
const notNull = (value, helpers) => {
  if (value === null || value === "null") {
    // Check if the value is null or 'null'
    return helpers.error("any.invalid");
  }
  return value;
};

// Define the book schema with custom validation
const bookSchema = Joi.object({
  name: Joi.string().min(3).max(30).lowercase().required().custom(notNull),
  category: Joi.string().min(3).max(30).lowercase().required().custom(notNull),
  author: Joi.string().min(3).max(30).lowercase().required().custom(notNull),
}).required();

export { bookSchema };
