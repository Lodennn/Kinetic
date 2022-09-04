export const addWorkoutSetsValidation = (formEl) => {
  let validator = {};
  //prettier-ignore
  const allSetsCheckboxes = Array.from(formEl.querySelectorAll(`input[type='checkbox']`));

  allSetsCheckboxes.forEach((input) => {
    validator = {
      ...validator,
      [input.name]: input.checked,
    };
  });

  for (let key in validator) {
    //prettier-ignore
    formEl[key].parentElement.classList.remove('checkbox__sets--valid', 'checkbox__sets--invalid');

    let validationClass = "";
    //prettier-ignore
    validator[key] = validator[key] || false;
    validator[key]
      ? (validationClass = "checkbox__sets--valid")
      : (validationClass = "checkbox__sets--invalid");

    formEl[key].parentElement.classList.add(validationClass);
  }

  return validator;
};
