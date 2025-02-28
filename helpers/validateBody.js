import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { id } = req.params;
    const numericId = Number(id);

    if (isNaN(numericId) || !Number.isInteger(numericId)) {
      next(HttpError(400, "Id must be an integer"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
