import React from "react";

const Editworkout = React.forwardRef((props, ref) => {
  return (
    <form onSubmit={props.onSubmit} ref={ref}>
      {props.children}
    </form>
  );
});

export default Editworkout;
