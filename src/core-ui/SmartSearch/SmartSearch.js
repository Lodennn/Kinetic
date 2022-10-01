import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./SmartSearch.module.scss";

const SmartSearch = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const [selectedValue, setSelectedValue] = useState("");

  const smartSearchInputRef = useRef(null);

  const transformedData = (data) => {
    let workoutsCategorized = {};

    for (let i = 0; i < data.length; i++) {
      let item = props.data[i];
      let targetKey = item.category;
      if (!(targetKey in workoutsCategorized))
        workoutsCategorized[targetKey] = [];
      workoutsCategorized[targetKey].push(item.workoutName);
    }

    return {
      categorizedData: workoutsCategorized,
      categories: Object.keys(workoutsCategorized),
    };
  };

  const { categorizedData, categories } = transformedData(props.data);

  const { name, value } = props.input;
  const { setFieldValue } = props;

  useEffect(() => {
    if (selectedValue) {
      setFieldValue(name, selectedValue);
    }
    if (isChanged) {
      setSelectedValue("");
    }
  }, [selectedValue, isChanged, setFieldValue, name, value]);

  return (
    <div className={classes["smart-search"]}>
      <input
        {...props.input}
        value={selectedValue || props.input.value}
        ref={smartSearchInputRef}
        onChange={(e) => {
          props.input.onChange(e);
          setIsChanged(true);
        }}
        onFocus={onFocus}
        onBlur={(e) => {
          props.input.onBlur(e);
          setTimeout(onBlur, 100);
        }}
        autoComplete="off"
      />
      {categories.length > 0 && (
        <div
          className={classes["smart-search__result"]}
          style={{ display: isFocused ? "block" : "none" }}
        >
          {categories.map((category) => {
            return (
              <ul key={category} className={classes["smart-search__list"]}>
                <li className={classes["smart-search__category"]}>
                  <span>{category}</span>
                  <span></span>
                </li>
                {[...new Set(categorizedData[category])].map((workoutName) => {
                  return (
                    <li
                      key={workoutName}
                      className={classes["smart-search__item"]}
                      onClick={() => {
                        setIsChanged(false);
                        setSelectedValue(workoutName);
                      }}
                    >
                      {workoutName}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
