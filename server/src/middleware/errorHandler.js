// Express recognizes error middleware by its 4 arguments, so `next` must stay.
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  console.error(error);

  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 600 ? error.status : 500;
  const message = status >= 500 ? "Something went wrong" : "Request failed";

  res.status(status).json({ message });
}
