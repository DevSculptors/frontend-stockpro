import styles from "./style.module.css";

import Modal from "react-modal";

export default function ModalBase({ children, isOpen,name }: ModalProps) {

  console.log(isOpen,"is open modal");
  
  return (
    <Modal
      isOpen={isOpen}
      contentLabel={name}
      className={styles.modalAddUsers}
      overlayClassName={styles.overlay}
    >
   {children}
    </Modal>
  );
}

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  id?: string;
  name?: string;
}
