// `message` is optional and only for short, safe texts written by us (e.g. "Product not found").
// The error handler sends it to the client; without it the client gets a generic message.
export function createHttpError(status, message) {
  const error = new Error(message ?? "Request failed");
  error.status = status;
  error.isClientSafe = message !== undefined;
  return error;
}
