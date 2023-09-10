import styles from "./style.module.css";

import Modal from "react-modal";

export default function ModalBase({ children, isOpen,name }: ModalProps) {

  console.log(isOpen,"is open modal");
  
  return (
    <Modal
      isOpen={isOpen}
      contentLabel={name}
      className={styles.modal__on}
      overlayClassName={styles.overlay}
    >
   {children}
    </Modal>
  );
}

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  id?: string;
  name?: string;
}
