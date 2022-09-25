export const addWorkoutSetsValidation = (formEl, preValidation) => {
  let validator = {};
  let isValid = [];

  //prettier-ignore
  const allSetsCheckboxes = Array.from(formEl.querySelectorAll(`.set-checkbox`));

  allSetsCheckboxes.forEach((input) => {
    let validValue = input.dataset.valid === "true" ? true : false;
    validator = {
      ...validator,
      // [input.name]: input.checked,
      [input.name]: validValue,
    };
  });

  for (let key in validator) {
    // isValid = isValid;
    //prettier-ignore
    formEl[key].parentElement.classList.remove('checkbox__sets--valid', 'checkbox__sets--invalid');

    let validationClass = "";
    //prettier-ignore
    validator[key] = validator[key] || false;
    validator[key]
      ? (validationClass = "checkbox__sets--valid")
      : (validationClass = "checkbox__sets--invalid");

    formEl[key].parentElement.classList.add(validationClass);

    isValid.push(validator[key]);
  }

  return { validator, isValid: isValid.every(Boolean) };
};

const fullnameMaxLength = 6;

export const isLengthGreaterThan6Letters = (value) => {
  return value.length > fullnameMaxLength;
};

export const isRequried = (value) => {
  console.log("typeof value: ", typeof value);
  if (typeof value === "string") {
    return value.length > 0 || !!value;
  }
  if (typeof value === "number") {
    return value > 0;
  }
  return false;
};

export const isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const onlyNumbers = (value) => {
  return /^\d+$/.test(value);
};

export const htmlToCleanString = (string) => {
  return string.replace(/(<([^>]+)>)/gi, "");
};
