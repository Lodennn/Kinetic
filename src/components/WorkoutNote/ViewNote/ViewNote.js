import SecondaryButton from "../../../core-ui/Buttons/SecondaryButton/SecondaryButton";

const ViewNote = (props) => {
  return (
    <div
      className="flex-column justify-content-between"
      style={{ height: "100%" }}
    >
      <p className="mb-md">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
        aliquam odit facere, similique, veritatis unde voluptatem vel laborum
        vitae corporis dolores saepe! Corrupti blanditiis ducimus inventore
        doloremque obcaecati alias. Ut!
      </p>
      <hr className="mt-auto" />
      <div className="flex-cta-wrapper pt-sm pb-sm">
        <SecondaryButton onClick={() => console.log("DELETE")} variant="danger">
          Delete
        </SecondaryButton>
        <SecondaryButton onClick={() => console.log("Edit")}>
          Edit
        </SecondaryButton>
      </div>
    </div>
  );
};

export default ViewNote;
