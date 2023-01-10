import { templateReturn, STATUS_SUCCESS, STATUS_FAILURE } from "./utils.js";

export const handlerError = (error, req, res, next) => {
  console.error(error.stack);
  const retour = templateReturn;
  retour.status = STATUS_FAILURE;
  retour.message = error.message;
  res.status(500).send(retour);
};

export const handlerSuccess = (message, req, res, next) => {
  const retour = templateReturn;
  retour.status = STATUS_SUCCESS;
  message = message ? message : "";
  retour.message = message;
  res.send(retour);
};
