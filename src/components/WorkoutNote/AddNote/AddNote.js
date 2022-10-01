import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SecondaryButton from "../../../core-ui/Buttons/SecondaryButton/SecondaryButton";
import { addNoteAction } from "../../../store/notes/notes-slice";
import serviceError from "../../../services/errors";
import * as Yup from "yup";
import { renderErrorClass, renderErrorMessage } from "../../../helpers/form";

const AddNote = (props) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    note: Yup.string().required(serviceError.required),
  });

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      note: "",
    },
    validationSchema,
    onSubmit(values) {
      dispatch(
        addNoteAction({
          userId: "222",
          workoutId: props.workoutId,
          note: values.note,
        })
      );
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="title-4 text-uppercase mb-sm">Add Note</h4>
      <div className="form-group mb-md">
        <textarea
          className={`form-control kinetic-input kinetic-textarea ${renderErrorClass(
            { errors, touched },
            "note"
          )}`}
          placeholder="Write your note"
          name="note"
          onChange={handleChange}
        ></textarea>
      </div>
      <p className="error-message">{renderErrorMessage(errors, "note")}</p>
      <div className="flex-cta-wrapper">
        <SecondaryButton onClick={props.onHide} type="button" variant="danger">
          Cancel
        </SecondaryButton>
        <SecondaryButton type="submit">Ok</SecondaryButton>
      </div>
    </form>
  );
};

export default AddNote;
