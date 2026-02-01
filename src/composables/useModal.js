/**
 * Modal 控制 Composable
 * 提供 Bootstrap Modal 的顯示與隱藏功能
 */
import { onMounted, ref } from "vue";
import BsModal from "bootstrap/js/dist/modal";

/**
 * @param {Ref} modalRef - modal 元素的 ref
 * @returns {{ modal: Ref, openModal: Function, hideModal: Function }}
 */
export function useModal(modalRef) {
  const modal = ref(null);

  function openModal() {
    if (modal.value) {
      modal.value.show();
    }
  }

  function hideModal() {
    if (modal.value) {
      modal.value.hide();
    }
  }

  onMounted(() => {
    const modalElement = modalRef.value;
    if (modalElement) {
      modal.value = new BsModal(modalElement);
    }
  });

  return {
    modal,
    openModal,
    hideModal,
  };
}
