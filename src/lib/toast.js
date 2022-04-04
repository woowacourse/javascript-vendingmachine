export const { showToast } = (function () {
  let prevSetTimeout = null;
  const toast = document.querySelector('#toast');
  return {
    showToast({ isErrorMessage, message }) {
      toast.classList.add('show');

      if (isErrorMessage) {
        toast.classList.add('error');
      }

      if (!isErrorMessage) {
        toast.classList.remove('error');
      }

      toast.textContent = message;

      if (prevSetTimeout) {
        // 연속으로 이벤트가 수행되면 애니메이션 재 트리거, 타이머는 디바운스 처리
        const [showAnimation] = toast.getAnimations();
        showAnimation.cancel();
        showAnimation.play();
        clearTimeout(prevSetTimeout);
      }

      prevSetTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    },
  };
})();
