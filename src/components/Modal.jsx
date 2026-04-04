"use client"

import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
    return createPortal(
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-1000" onClick={onClose}>
            <div className="bg-panel p-8 rounded-[1rem] border border-outline shadow-xl shadow-black flex flex-col gap-4 justify-center items-center" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default Modal;