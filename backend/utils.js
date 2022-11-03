export const objectBigIntToInt = (object) => {
  let return_object = {};
  for (const [key, value] of Object.entries(object)) {
    return_object[key] = typeof value === "bigint" ? parseInt(value) : value;
  }
  return return_object;
};

export const STATUS_SUCCESS = "success";
export const STATUS_FAILURE = "failure";

export const templateReturn = {
  status: STATUS_SUCCESS,
  message: "",
};
