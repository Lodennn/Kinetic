import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import PrimaryButton from "../../core-ui/Buttons/PrimaryButton/PrimaryButton";
import { setsType } from "../../data/setsType";
import AddSet from "../AddSet/AddSet";
import TargetedMuscles from "../TargetedMuscles/TargetedMuscles";
import ModalSecondary from "../../core-ui/ModalSecondary/ModalSecondary";

import { ReactComponent as SupersetIcon } from "../../assets/icons/SUPERSET.svg";
import { ReactComponent as DropsetIcon } from "../../assets/icons/DROPSET.svg";

import { BsChevronLeft } from "react-icons/bs";

import "./AddWorkout.scss";
import useReadData from "../../hooks/useReadData";

const AddWorkout = (props) => {
  const [targetedMuscle, setTargetedMuscle] = useState("");
  const [activeSetsName, setActiveSetsName] = useState("");
  const [numOfSets, setNumOfSets] = useState([]);
  const [superSetNumOfSets, setSuperSetNumOfSets] = useState([]);
  const [dropSetNumOfSets, setDropSetNumOfSets] = useState([]);
  const [numOfSpecialSets, setNumOfSpecialSets] = useState(0);
  const [userSetsType, setUserSetsType] = useState("");

  const [totalRepsOfDropset, setTotalRepsOfDropset] = useState(0);

  const userNumberOfWeight = useRef("");
  const userNumberOfReps = useRef("");

  useEffect(() => {
    if (activeSetsName === "Superset") setDropSetNumOfSets([]);
    if (activeSetsName === "Dropset")
      setSuperSetNumOfSets(
        Array(numOfSets.length).fill({ weight: "", reps: "" })
      );
  }, [activeSetsName, numOfSets]);

  useEffect(() => {
    setTotalRepsOfDropset(
      dropSetNumOfSets.reduce((acc, cur) => {
        return acc + cur.reps;
      }, 0)
    );
  }, [dropSetNumOfSets]);

  const {
    data: setId,
    showModal,
    showModalHandler,
    hideModalHandler,
  } = useReadData();

  const addTargetedMuscle = useCallback((muscle) => {
    setTargetedMuscle(muscle);
  }, []);

  const onChangeNumberOfSets = useCallback((event) => {
    setNumOfSets(Array(+event.target.value).fill({ weight: "", reps: "" }));
    setSuperSetNumOfSets(
      Array(+event.target.value).fill({ weight: "", reps: "" })
    );
  }, []);

  const onChangeNumberOfDropSets = useCallback((event) => {
    setDropSetNumOfSets(
      Array(+event.target.value).fill({ weight: "", reps: "" })
    );
  }, []);

  const onChangeNumberOfSpecialSets = (event) => {
    setNumOfSpecialSets(event.target.value);
  };

  const getActiveSetsTypeHandler = (type) => {
    let setsName = type === "super" ? "Superset" : "Dropset";
    setActiveSetsName(setsName);
  };

  const toggleAnimationHandler = () => {
    setActiveSetsName("");
  };

  const onChangeUserNumberOfReps = (event) => {
    userNumberOfReps.current = event.target.value;
  };

  const onChangeUserNumberOfWeight = (event) => {
    userNumberOfWeight.current = event.target.value;
  };

  const addSetsHandler = () => {
    if (userSetsType === "main") {
      setNumOfSets((prevState) => {
        prevState[setId] = {
          weight: userNumberOfWeight.current,
          reps: userNumberOfReps.current,
        };
        return [...prevState];
      });
    } else if (userSetsType === "super") {
      setSuperSetNumOfSets((prevState) => {
        prevState[setId] = {
          weight: userNumberOfWeight.current,
          reps: userNumberOfReps.current,
        };
        return [...prevState];
      });
      setDropSetNumOfSets([]);
    } else if (userSetsType === "drop") {
      setDropSetNumOfSets((prevState) => {
        prevState[setId] = {
          weight: userNumberOfWeight.current,
          reps: userNumberOfReps.current,
        };
        return [...prevState];
      });
      setSuperSetNumOfSets([]);
    }
  };

  const showModalForMainSets = (setId) => {
    setUserSetsType("main");
    showModalHandler(setId);
  };

  const showModalForSuperSets = (setId) => {
    setUserSetsType("super");
    showModalHandler(setId);
  };

  const showModalForDropSets = (setId) => {
    setUserSetsType("drop");
    showModalHandler(setId);
  };

  return (
    <Fragment>
      {showModal && (
        <ModalSecondary onHide={hideModalHandler}>
          <div>
            <input
              type="text"
              placeholder="Weight"
              onChange={onChangeUserNumberOfWeight}
            />
            <input
              type="text"
              placeholder="Reps"
              onChange={onChangeUserNumberOfReps}
            />
            <button
              onClick={() => {
                addSetsHandler();
                hideModalHandler();
              }}
            >
              +
            </button>
          </div>
        </ModalSecondary>
      )}
      <div className={"add-workout"}>
        <div className="p-2">
          <h3 className="title-3 mb-sm">Add Workout</h3>
          <form className={"add-workout__form"}>
            <div className="form-group">
              <input
                type="text"
                className="form-control kinetic-input kinetic-input--primary"
                placeholder="Workout Name"
              />
            </div>
            <div className="form-group">
              <h4 className="title-4">Targeted Muscle: </h4>
              <TargetedMuscles
                muscles={["Chest", "Back", "Triceps", "Biceps"]}
                addTargetedMuscle={addTargetedMuscle}
              />
            </div>
            <div className={`form-group-flex`}>
              <h4 className="title-4">Num of sets: </h4>
              <input
                type="number"
                className="input-1-digit kinetic-input "
                defaultValue={0}
                onChange={onChangeNumberOfSets}
              />
            </div>
            <div style={{ display: "flex", gap: "3rem" }}>
              {numOfSets.map((set, idx) => {
                return (
                  <AddSet
                    id={idx}
                    key={idx}
                    reps={set.reps}
                    weight={set.weight}
                    showModalHandler={showModalForMainSets.bind(null, idx)}
                  />
                );
              })}
            </div>
          </form>
        </div>
        <hr />
        <div
          className={`add-workout__actions ${
            activeSetsName ? "sets-animation-active" : null
          }`}
        >
          {setsType.map((set) => {
            return (
              <PrimaryButton
                key={set.id}
                type={set.type}
                getActiveSetsTypeHandler={getActiveSetsTypeHandler}
              >
                {set.name}
              </PrimaryButton>
            );
          })}

          <div className="set-type">
            <header className="set-type__header">
              <div className="set-type__header-title">
                <div onClick={toggleAnimationHandler}>
                  <BsChevronLeft className="fix-icon" />
                </div>
                <h4 className="set-type__header-title--text">
                  {activeSetsName}
                </h4>
              </div>
              <div className="set-type__sets">
                {setsType.map((set, idx) => (
                  <div
                    key={set + idx}
                    className={`set-type__sets-set ${
                      set.name === activeSetsName ? "active" : null
                    }`}
                    onClick={getActiveSetsTypeHandler.bind(null, set.type)}
                  >
                    {set.type === "super" ? <SupersetIcon /> : <DropsetIcon />}
                  </div>
                ))}
              </div>
            </header>
            <section>
              <div className="set-type__form">
                {activeSetsName === "Superset" ? (
                  <div className="set-type__form--super">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control kinetic-input kinetic-input--white"
                        placeholder="Workout Name"
                        onChange={onChangeNumberOfDropSets}
                      />
                    </div>
                    <div className={`form-group-flex`}>
                      <h4 className="title-4">Num of sets: </h4>
                      <div>{numOfSets.length}</div>
                    </div>
                    <div style={{ display: "flex", gap: "3rem" }}>
                      {superSetNumOfSets.map((set, idx) => {
                        return (
                          <AddSet
                            id={idx}
                            key={idx}
                            reps={set.reps}
                            weight={set.weight}
                            showModalHandler={showModalForSuperSets.bind(
                              null,
                              idx
                            )}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="set-type__form--drop">
                    <div className={`form-group-flex`}>
                      <h4 className="title-4">Num of sets: </h4>
                      <input
                        type="number"
                        className="input-1-digit kinetic-input "
                        defaultValue={0}
                        onChange={onChangeNumberOfDropSets}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "3rem" }}>
                      {dropSetNumOfSets.map((set, idx) => {
                        return (
                          <AddSet
                            id={idx}
                            key={idx}
                            reps={set.reps}
                            weight={set.weight}
                            showModalHandler={showModalForDropSets.bind(
                              null,
                              idx
                            )}
                          />
                        );
                      })}
                    </div>
                    <div className="set-type__total-num-reps">
                      Total of REPS: {totalRepsOfDropset}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddWorkout;
