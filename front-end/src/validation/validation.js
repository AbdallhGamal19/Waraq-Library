const validation = (schema, obj) => {
  const validationResult = schema.validate(
    { ...obj },
    {
      abortEarly: false,
    }
  );
  return validationResult;
};
export default validation;
