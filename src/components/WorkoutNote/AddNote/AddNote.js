import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SecondaryButton from "../../../core-ui/Buttons/SecondaryButton/SecondaryButton";
import { addNoteAction } from "../../../store/notes/notes-slice";

const AddNote = (props) => {
  const dispatch = useDispatch();

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
    onSubmit(values) {
      console.log("Submitted form addNote - ", values);
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
          className="form-control kinetic-input kinetic-textarea"
          placeholder="Write your note"
          name="note"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex-cta-wrapper">
        <SecondaryButton
          onClick={() => console.log("CANCEL")}
          type="button"
          variant="danger"
        >
          Cancel
        </SecondaryButton>
        <SecondaryButton type="submit">Ok</SecondaryButton>
      </div>
    </form>
  );
};

export default AddNote;
