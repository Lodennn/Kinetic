import { defaultSetsValue } from "../services/lookups";

export const controlValue = (event, condition) => {
    const value = +event.target.value;
    if (value < condition) return;
    return value;
  }

  export const increaseSetsNumber = (prevState) => ({
    ...prevState,
    sets: [...prevState.sets, defaultSetsValue],
  })

  export const decreaseSetsNumber = (prevState) => {
    return function(value, sets, numberOfSets) {
      let resetPrevState = [...sets.sets.slice(0, numberOfSets)];
  
      let newState = resetPrevState.concat(
        Array(Math.abs(value - numberOfSets)).fill(defaultSetsValue)
      );
  
      return { ...prevState, sets: newState };
    }
  }