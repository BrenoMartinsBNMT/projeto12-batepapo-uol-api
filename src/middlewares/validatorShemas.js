export default function validatorSchemas(schema) {
  return async function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send(
        error.details.map((element) => {
          return element.message;
        })
      );
    }
    next();
  };
}
