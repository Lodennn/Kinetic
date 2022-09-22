import errors from "../services/errors";

export const uncheckAll = (formEl) => {
  //prettier-ignore
  const allSetsCheckboxes = Array.from(formEl.querySelectorAll(`input[type='checkbox']`));

  allSetsCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.dataset.valid = false;
  });
};

export const renderErrorClass = (errorData, fieldKey) => {
  //prettier-ignore
  return `${errorData.errors[fieldKey] && errorData.touched[fieldKey] && "input-error"}`;
};

export const renderErrorMessage = (errors, fieldKey) => {
  //prettier-ignore
  return !!errors[fieldKey] ? errors[fieldKey] : errors.undefiend;
};
