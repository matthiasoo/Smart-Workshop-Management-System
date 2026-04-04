"use client"

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose, isOpen }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
            <div role="dialog" aria-modal="true" className="glass-panel p-10 flex flex-col gap-8 justify-center items-center animate-scale-up min-w-[350px] relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-danger-outline via-danger to-danger-outline shadow-[0_0_10px_oklch(0.65_0.2_20)]"></div>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}