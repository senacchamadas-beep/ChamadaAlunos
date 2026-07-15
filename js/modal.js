// Global modal system — replaces alert/confirm
function ensureModal(){
  let overlay = document.getElementById("modal");
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.id = "modal";
  overlay.className = "modal-overlay hidden";
  overlay.innerHTML = `
    <div class="modal">
      <h3 id="modal-title"></h3>
      <p id="modal-message"></p>
      <div class="modal-actions" id="modal-actions"></div>
    </div>`;
  document.body.appendChild(overlay);
  return overlay;
}

export function showModal(title, message){
  return new Promise(resolve => {
    const overlay = ensureModal();
    overlay.querySelector("#modal-title").textContent = title;
    overlay.querySelector("#modal-message").textContent = message;
    const actions = overlay.querySelector("#modal-actions");
    actions.innerHTML = "";
    const ok = document.createElement("button");
    ok.className = "btn btn-primary";
    ok.textContent = "OK";
    ok.onclick = () => { overlay.classList.add("hidden"); resolve(true); };
    actions.appendChild(ok);
    overlay.classList.remove("hidden");
  });
}

export function showConfirm(title, message, okText="Confirmar"){
  return new Promise(resolve => {
    const overlay = ensureModal();
    overlay.querySelector("#modal-title").textContent = title;
    overlay.querySelector("#modal-message").textContent = message;
    const actions = overlay.querySelector("#modal-actions");
    actions.innerHTML = "";
    const cancel = document.createElement("button");
    cancel.className = "btn btn-ghost";
    cancel.textContent = "Cancelar";
    cancel.onclick = () => { overlay.classList.add("hidden"); resolve(false); };
    const ok = document.createElement("button");
    ok.className = "btn btn-primary";
    ok.textContent = okText;
    ok.onclick = () => { overlay.classList.add("hidden"); resolve(true); };
    actions.appendChild(cancel);
    actions.appendChild(ok);
    overlay.classList.remove("hidden");
  });
}

// Expose globally too
window.showModal = showModal;
window.showConfirm = showConfirm;
