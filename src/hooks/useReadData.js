import { useEffect } from "react";
import { useCallback, useState } from "react";

const useReadData = (reRenderObject = []) => {
  const [showModal, setShowModal] = useState(false);
  const [readData, setReadData] = useState({});

  useEffect(() => {
    const foundedData = reRenderObject.find((item) => item.id === readData.id);
    if (foundedData) {
      setReadData(foundedData);
    }
  }, [reRenderObject, readData.id]);

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
