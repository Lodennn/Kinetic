import React from "react";

const AddSpecialSetModal = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Weight"
        onChange={props.onChangeUserNumberOfWeight}
      />
      <input
        type="text"
        placeholder="Reps"
        onChange={props.onChangeUserNumberOfReps}
      />
      <button
        onClick={() => {
          props.addSetsHandler();
          props.hideModalHandler();
        }}
      >
        +
      </button>
    </div>
  );
};

export default AddSpecialSetModal;
