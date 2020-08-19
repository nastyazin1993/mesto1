function togglePopup(modal) {
    modal.classList.toggle("popup_open");
    if (modal.classList.contains("popup_open")) {
      document.addEventListener("keydown", keyEscapeHandler);
      document.addEventListener("click", closeOnOverlay);
    } else {
      document.removeEventListener("keydown", keyEscapeHandler);
      document.removeEventListener("click", closeOnOverlay);
    }
  }
  
  function closeOnOverlay(evt) {
    const openedModal = document.querySelector(".popup_open");
    if (evt.target === openedModal) {
      togglePopup(openedModal);
    }
  }
  
  function keyEscapeHandler(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".popup_open");
      togglePopup(openedModal);
    }
  }

  export {togglePopup, closeOnOverlay, keyEscapeHandler};