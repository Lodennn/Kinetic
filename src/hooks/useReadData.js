import { useCallback, useState } from "react";

const useReadData = () => {
  const [showModal, setShowModal] = useState(false);
  const [readData, setReadData] = useState();

  const showModalHandler = useCallback((data) => {
    setReadData(data);
    setShowModal(true);
  }, []);

  const hideModalHandler = useCallback(() => {
    setShowModal(false);
  }, []);

  return {
    showModal,
    showModalHandler,
    hideModalHandler,
    data: readData,
  };
};

export default useReadData;
