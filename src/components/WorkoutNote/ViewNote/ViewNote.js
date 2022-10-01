import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondaryButton from "../../../core-ui/Buttons/SecondaryButton/SecondaryButton";
import LoadingSpinner from "../../../core-ui/LoadingSpinner/LoadingSpinner";
import { getDocumentWithId } from "../../../services/api";
import {
  deleteNoteAction,
  updateNoteAction,
} from "../../../store/notes/notes-slice";

import * as Yup from "yup";
import serviceError from "../../../services/errors";
import { renderErrorClass, renderErrorMessage } from "../../../helpers/form";

const ViewNote = (props) => {
  const dispatch = useDispatch();
  const [note, setNote] = useState(null);
  const { noteId } = props.workoutDetails;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getNote = async () => {
      setIsLoading(true);
      const getUserResponse = await getDocumentWithId({
        collection: "notes",
        id: noteId,
      });
      return getUserResponse.note;
    };
    getNote().then((note) => {
      setNote(note);
      setIsLoading(false);
    });
  }, [noteId]);

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
      console.log("values: ", values);
      dispatch(
        updateNoteAction({
          note: values.note,
          workoutId: props.workoutDetails.id,
          noteId,
        })
      );
    },
  });

  console.log("errors: ", errors);

  return (
    <div
      className="flex-column justify-content-between"
      style={{ height: "100%" }}
    >
      {isLoading || isSubmitting ? (
        <LoadingSpinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <textarea
            className={`form-control kinetic-input kinetic-textarea ${renderErrorClass(
              { errors, touched },
              "note"
            )}`}
            style={{ height: "100%" }}
            placeholder="Write your note"
            name="note"
            defaultValue={note}
            onChange={handleChange}
          ></textarea>

          <hr className="mt-auto" />
          {!isSubmitting && (
            <div className="flex-cta-wrapper pt-sm pb-sm">
              <SecondaryButton
                onClick={() =>
                  dispatch(
                    deleteNoteAction({
                      workoutId: props.workoutDetails.id,
                      noteId,
                    })
                  )
                }
                variant="danger"
              >
                {"Delete"}
              </SecondaryButton>
              <SecondaryButton type="submit">{"Edit"}</SecondaryButton>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ViewNote;
