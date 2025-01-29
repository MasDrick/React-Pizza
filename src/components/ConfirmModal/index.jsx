import React, { useState } from 'react';
import styles from './ConfirmModal.module.scss';

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Вы уверены?',
  confirmText = 'Да',
  cancelText = 'Нет',
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // Начинаем анимацию исчезновения
    setTimeout(() => {
      setIsClosing(false);
      onCancel(); // Вызываем функцию закрытия после завершения анимации
    }, 300); // 300ms - длительность анимации
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ''}`}>
      <div className={`${styles.modal} ${isClosing ? styles.scaleDown : ''}`}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <div className={styles.modalButtons}>
          <button className={`${styles.modalButton} ${styles.modalButtonYes}`} onClick={onConfirm}>
            {confirmText}
          </button>
          <button className={`${styles.modalButton} ${styles.modalButtonNo}`} onClick={handleClose}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
