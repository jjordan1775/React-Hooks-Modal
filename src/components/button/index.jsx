const Button = ({callback, children}) =>{
    return(
        <button onClick={callback} className="modal-init">{children}</button>
    )
}

export default Button