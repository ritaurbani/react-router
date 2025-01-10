import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const apiBase = "http://localhost:3000";

function ShowPostDetails() {
   //devo aggiornare quindi mi serve variabile
   const [post, setPost] = useState(null) //ancora non ce nessuna pizza
   const [loading, setLoading] = useState(false) //ancora non ce nessuna pizza
   const { id } = useParams() //per prelevare id della pagine corrente
   console.log(useParams)
   //prelevare i details del post > axios per other info al mounting della pagina

   const navigate = useNavigate();

   useEffect(() => {
      setLoading(true)
      axios.get(`${apiBase}/posts/${id}`)
         .then((resp) => { //entriamo qui quando risposta positiva e la slva nello state
            console.log(resp);
            setPost(resp.data)
         })
         .catch((err) => {
            if (err.status === 404) { //rotta non-found non esite quindi finisce nel route definito in app.jsx
               navigate("/not-found")
            }
            console.log(err);
         })
         .finally(() => { //eseguito in ogni caso
            setLoading(false)
         })
   }, [id])

   return (
      <>
         <div>
            <button onClick={() => navigate(-1)}>Back</button>
         </div>
         {post && ( //momento in cui pizza ancora non c`e`
            <div>
               <h1>{post.title}</h1>
               <img src={`${apiBase}/${post.image}`} alt="" />
               <div className="m-3">
                  <Link className=' me-2 btn btn-success' to={`/posts/${post.id - 1}`}>Prev</Link>
                  <Link className='btn btn-success' to={`/posts/${post.id + 1}`}>Next</Link>
               </div>
            </div>
         )}
         {loading && <p>Loading...</p>}


      </>
   );
}

export default ShowPostDetails