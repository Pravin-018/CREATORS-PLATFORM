function Button({ children, onClick, type = 'button' }) {
  return (
    <button className="primary" type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
