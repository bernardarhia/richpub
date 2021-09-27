const Button = ({children, ...others}) => {
    return (
        <button {...others}>
            {children}
        </button>
    )
}

export default Button
