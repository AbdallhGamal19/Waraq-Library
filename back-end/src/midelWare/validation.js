const validation = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(
      { ...req.body, ...req.header, ...req.params },
      {
        abortEarly: false,
      }
    );

    if (!validationResult.error) {
      return next();
    }
    return res.json(validationResult.error);
  };
};
export default validation;
