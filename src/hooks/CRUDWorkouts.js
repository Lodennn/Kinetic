import { useCallback, useRef, useState } from "react";
import { defaultSetsValue } from "../services/lookups";

const useCrudWorkouts = (sets, superSets, dropSets, workoutData, showModalHandler, toUse) => {
 
  // editing variables
  const [superSetNumOfSets, setSuperSetNumOfSets] = useState({
    sets: superSets,
    filledSets: 0,
  });
  const [dropSetNumOfSets, setDropSetNumOfSets] = useState({sets: dropSets, filledSets: 0});
  const [returnedSets, setReturnedSets] = useState({ sets, filledSets: 0 });
  const [userSetsType, setUserSetsType] = useState("");
  const userNumberOfWeight = useRef("");
  const userNumberOfReps = useRef("");
  const addWorkoutSuperFormRef = useRef(null);
  const addWorkoutDropFormRef = useRef(null);
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

  // SET TYPE PART
  const showModalForSuperSets = (data) => {
    resetUserSecondaryInputs();
    setUserSetsType("super");
    showModalHandler(data);
  };

  // SET TYPE PART
  const showModalForDropSets = (data) => {
    resetUserSecondaryInputs();
    setUserSetsType("drop");
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

    // SECONDARY MODAL
    const addSetsHandler = () => {
      if (userSetsType === "main") {
        setReturnedSets((prevState) => {
          prevState.sets[workoutData.setId] = {
            weight: userNumberOfWeight.current,
            reps: userNumberOfReps.current,
            weightUnit: weightUnitRef.current,
          };
          return {
            sets: [...prevState.sets],
            filledSets: prevState.filledSets + 1,
          };
        });
      } else if (userSetsType === "super") {
        setSuperSetNumOfSets((prevState) => {
          prevState.sets[workoutData.setId] = {
            weight: userNumberOfWeight.current,
            reps: userNumberOfReps.current,
            weightUnit: weightUnitRef.current,
          };
          return {
            sets: [...prevState.sets],
            filledSets: prevState.filledSets + 1,
          };
        });
        setDropSetNumOfSets(defaultSetsValue);
      } else if (userSetsType === "drop") {
        setDropSetNumOfSets((prevState) => {
          prevState.sets[workoutData.setId] = {
            weight: userNumberOfWeight.current,
            reps: userNumberOfReps.current,
            weightUnit: weightUnitRef.current,
          };
          return {
            sets: [...prevState.sets],
            filledSets: prevState.filledSets + 1,
          };
        });
        setSuperSetNumOfSets(defaultSetsValue);
      }
    };

  return {
    returnedSets,
    superSetNumOfSets,
    dropSetNumOfSets,
    addWorkoutSuperFormRef,
    getWeightUnit,
    addSetsHandler,
    setReturnedSets,
    setDropSetNumOfSets,
    setSuperSetNumOfSets,
    showModalForMainSets,
    showModalForSuperSets,
    showModalForDropSets,
    onChangeUserNumberOfReps,
    onChangeUserNumberOfWeight,
  };
};

export default useCrudWorkouts;
