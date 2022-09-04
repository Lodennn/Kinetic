export const uncheckAll = (formEl) => {
  //prettier-ignore
  const allSetsCheckboxes = Array.from(formEl.querySelectorAll(`input[type='checkbox']`));

  allSetsCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};
