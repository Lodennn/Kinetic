import { useCallback, useRef, useState } from "react";

const useCrudWorkouts = (sets, showModalHandler, toUse) => {
  // editing variables
  const [returnedSets, setReturnedSets] = useState({ sets, filledSets: 0 });
  const [userSetsType, setUserSetsType] = useState("");
  const userNumberOfWeight = useRef("");
  const userNumberOfReps = useRef("");
  const weightUnitRef = useRef("kg");

  // helper
  const resetUserSecondaryInputs = () => {
    userNumberOfReps.current = 0;
    userNumberOfWeight.current = 0;
  };

  // MAIN
  const showModalForMainSets = (data) => {
    resetUserSecondaryInputs();
    setUserSetsType("main");
    showModalHandler(data);
  };

  const getWeightUnit = useCallback((unit) => {
    weightUnitRef.current = unit;
  }, []);

  // SECONDARY MODAL
  const onChangeUserNumberOfReps = (event) => {
    userNumberOfReps.current = event.target.value;
  };

  // SECONDARY MODAL
  const onChangeUserNumberOfWeight = (event) => {
    userNumberOfWeight.current = event.target.value;
  };

  return {
    returnedSets,
    userSetsType,
    userNumberOfReps,
    userNumberOfWeight,
    weightUnitRef,
    setReturnedSets,
    showModalForMainSets,
    getWeightUnit,
    onChangeUserNumberOfReps,
    onChangeUserNumberOfWeight,
  };
};

export default useCrudWorkouts;
