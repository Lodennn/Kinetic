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
import SupersetForm from "../SupersetForm/SupersetForm";
import DropsetForm from "../DropsetForm/DropsetForm";
import AddSpecialSetModal from "../../core-ui/Modal/AddSpecialSetModal/AddSpecialSetModal";

const AddWorkout = (props) => {
  const [targetedMuscle, setTargetedMuscle] = useState("");
  const [activeSetsName, setActiveSetsName] = useState("");

  const [numOfSets, setNumOfSets] = useState([]);
  const [superSetNumOfSets, setSuperSetNumOfSets] = useState([]);
  const [dropSetNumOfSets, setDropSetNumOfSets] = useState([]);

  const [userSetsType, setUserSetsType] = useState("");

  const userNumberOfWeight = useRef("");
  const userNumberOfReps = useRef("");

  useEffect(() => {
    if (activeSetsName === "Superset") setDropSetNumOfSets([]);
    if (activeSetsName === "Dropset")
      setSuperSetNumOfSets(
        Array(numOfSets.length).fill({ weight: "", reps: "" })
      );
  }, [activeSetsName, numOfSets]);

  // MAIN
  const addTargetedMuscle = useCallback((muscle) => {
    setTargetedMuscle(muscle);
  }, []);

  // MAIN
  const onChangeNumberOfSets = useCallback((event) => {
    setNumOfSets(Array(+event.target.value).fill({ weight: "", reps: "" }));
    setSuperSetNumOfSets(
      Array(+event.target.value).fill({ weight: "", reps: "" })
    );
  }, []);

  // MAIN
  const onChangeNumberOfDropSets = useCallback((event) => {
    setDropSetNumOfSets(
      Array(+event.target.value).fill({ weight: "", reps: "" })
    );
  }, []);

  // MAIN
  const getActiveSetsTypeHandler = (type) => {
    let setsName = type === "super" ? "Superset" : "Dropset";
    setActiveSetsName(setsName);
  };

  // MAIN
  const toggleAnimationHandler = () => {
    setActiveSetsName("");
  };

  // MAIN
  const showModalForMainSets = (setId) => {
    setUserSetsType("main");
    showModalHandler(setId);
  };

  // SECONDARY MODAL
  const {
    data: setId,
    showModal,
    showModalHandler,
    hideModalHandler,
  } = useReadData();

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

  // SET TYPE PART
  const showModalForSuperSets = (setId) => {
    setUserSetsType("super");
    showModalHandler(setId);
  };

  // SET TYPE PART
  const showModalForDropSets = (setId) => {
    setUserSetsType("drop");
    showModalHandler(setId);
  };

  return (
    <Fragment>
      {showModal && (
        <ModalSecondary onHide={hideModalHandler}>
          <AddSpecialSetModal
            onChangeUserNumberOfWeight={onChangeUserNumberOfWeight}
            onChangeUserNumberOfReps={onChangeUserNumberOfReps}
            hideModalHandler={hideModalHandler}
            addSetsHandler={addSetsHandler}
          />
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

          {/* SPECIAL SET TYPE */}
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
            {/* SPECIAL SET FORM */}
            <section>
              <div className="set-type__form">
                {activeSetsName === "Superset" ? (
                  <SupersetForm
                    onChangeNumberOfDropSets={onChangeNumberOfDropSets}
                    numOfSets={numOfSets}
                    superSetNumOfSets={superSetNumOfSets}
                    showModalForSuperSets={showModalForSuperSets}
                  />
                ) : (
                  <DropsetForm
                    onChangeNumberOfDropSets={onChangeNumberOfDropSets}
                    dropSetNumOfSets={dropSetNumOfSets}
                    showModalForDropSets={showModalForDropSets}
                  />
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
