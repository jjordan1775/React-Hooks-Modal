import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

const modalElement = document.getElementById('modal-root')

const  Modal = ({ children, defaultOpened = false }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const close = useCallback(() => setIsOpen(false), [])

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close
  }), [close])

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return createPortal(
    isOpen ? (
      <div className="modal">
        <div className="modal-overlay" onClick={close} />
        <div className="modal-body">
            <header>
                <h2>My sweet modal</h2>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" className="modal-close" aria-label="close" onClick={close}>
                    <path d="M12.8925 0.302486C12.7057 0.115233 12.452 0.01 12.1875 0.01C11.923 0.01 11.6693 0.115233 11.4825 0.302486L6.5925 5.18249L1.7025 0.292486C1.51567 0.105233 1.26202 0 0.9975 0C0.732982 0 0.479331 0.105233 0.2925 0.292486C-0.0975 0.682486 -0.0975 1.31249 0.2925 1.70249L5.1825 6.59249L0.2925 11.4825C-0.0975 11.8725 -0.0975 12.5025 0.2925 12.8925C0.6825 13.2825 1.3125 13.2825 1.7025 12.8925L6.5925 8.00249L11.4825 12.8925C11.8725 13.2825 12.5025 13.2825 12.8925 12.8925C13.2825 12.5025 13.2825 11.8725 12.8925 11.4825L8.0025 6.59249L12.8925 1.70249C13.2725 1.32249 13.2725 0.682486 12.8925 0.302486Z" fill="white"/>
                </svg>
            </header>
            {children}
        </div>
      </div>
    ) : null,
    modalElement
  )
}

export default forwardRef(Modal)