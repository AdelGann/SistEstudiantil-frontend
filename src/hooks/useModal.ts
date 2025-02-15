import { useState } from "react";

export const useModal = (): {
  modalState: boolean;
  changeModalState: () => void;
} => {
  const [modalState, setModalState] = useState(false);
  const changeModalState = () => {
    setModalState(!modalState);
  };
  return { modalState, changeModalState };
};
