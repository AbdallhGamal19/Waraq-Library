export function errorHandling(fun) {
  return (req, res, next) => {
    try {
      fun(req, res, next);
    } catch (error) {
      next(error, { cause: 500 });
    }
  };
}
