import './Modal.css'

const Modal = ({ content, classType }) => {
  return (
    <div className="touchableBackground">
      <div className={`content ${classType}`}>
        {content}
      </div>
    </div>
  )
}

export default Modal;