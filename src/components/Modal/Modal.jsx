import './Modal.css'

const Modal = ({ content, classType, onClose }) => {
  return (
    <div className="touchableBackground" onClick={onClose}>
      <div className={`content ${classType}`} onClick={e => e.stopPropagation()}>
        {content}
        <div className='closeButton' onClick={onClose}>X</div>
      </div>
    </div>
  )
}

export default Modal;