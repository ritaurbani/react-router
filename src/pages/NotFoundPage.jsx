import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";


function NotFoundPage() {
    const navigate = useNavigate();

    return(
        <>
        <h2>Ohhhps Pagina non trovata! Errore 404</h2>
        <button onClick={()=>{navigate(-1)}}>Back</button>
        <Link to="/">home</Link>
        </>
    );
}

export default NotFoundPage