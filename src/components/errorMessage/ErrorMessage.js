import img from './error.gif'
import './errorMessage.css'

const ErrorMessage = () => {
    return (
        <img src={img} alt="Error" className="error-img"/>
    )
}

export default ErrorMessage;