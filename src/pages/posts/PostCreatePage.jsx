import { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

    const initialFormData = {
        title: "",
        content: "",
        image: "",
        tags: [],

        // published: false,
        // category: "", 
    }
    function PostCreatePage() {

    const [formData, setFormData] = useState(initialFormData)// object
    
    const navigate = useNavigate()

    const apiBase = "http://localhost:3000";

    //FUNZIONE ONCHANGE aggiorna il valore dell'input passato-event(obj)
    const handleEventOnChange = (event) => {
        // const { name, type, value, checked} = event.target
        const keyToChange = event.target.name; //proprieta`nome - chiave dinamica
        let newValue;
        if (event.target.type === "checkbox") {
            newValue = event.target.checked;
        } else {
            newValue = event.target.value; //assegno valore a variabile newValue
        }
        console.log('formData: ', formData)//stato prima

        //creates a new object 
        const newData = {
            ...formData,
            //updates the specific field(keyToChange) with the new value(newValue).
            [keyToChange]: newValue, //override property title con quello che scrivo
        };
        console.log('new formData: ', newData)
        //Updates the state with the new form data/oggetto, causing the component to re-render.
        setFormData(newData); //rerender dell input finale
    };

    //FUNZIONE FORM SUBMIT
    const handlePostForm = (event) => {
        event.preventDefault();
        //I dati del form vengono inviati al backend tramite la chiamata axios.post.
        axios.post(`${apiBase}/posts`, formData).then((resp) => {
//Ora non ho lista di post-che e nell altra pagina-qui faccio redirect a quella lista o singolo post
        navigate("/posts")
        



            // //Il server salva il nuovo post e restituisce la risposta con i dati del post appena salvato.
            // console.log(resp)
            // // 2 creo la copia dell'array posts precedente, aggiungendo il nuovo post
            // const newArray = [...posts, resp.data];
            // // 3. L'array posts viene aggiornato con il nuovo post - setPosts sincronizza l'interfaccia utente ta con il backend
            // setPosts(newArray);
            // // 4. Ripulisco i campi del form reset back to initial values after the post has been added.
            // setFormData(initialFormData);
        })
    };

    return (
        <>
            {/* INPUT TITLE */}
            <section>
                {/* //FORM */}
                <form onSubmit={handlePostForm} >
                    <div className='my-4'>
                        <label htmlFor="title">Cerca titolo articolo</label>
                        <input
                            type="text"
                            className='form-control'
                            id='title'
                            name='title'
                            value={formData.title}
                            onChange={handleEventOnChange} />
                    </div>

                    {/* INPUT CONTENT */}
                    <div className='mb-3'>
                        <label htmlFor="content">Inserisci una descrizione</label>
                        <textarea
                            type="text"
                            className='form-control'
                            id='content'
                            name='content'
                            value={formData.content}
                            onChange={handleEventOnChange}></textarea>
                    </div>

                    {/* INPUT IMAGE */}
                    <div className='mb-3'>
                        <label htmlFor="content">Image</label>
                        <input
                            type="file"
                            className='form-control'
                            id='image'
                            name='image'
                            value={formData.image}
                            onChange={handleEventOnChange} />
                    </div>

                    {/* //BUTTON */}
                    <button type='submit' className='my-4 btn btn-success'>Submit</button>
                </form>
            </section>
        </>

    )
}

export default PostCreatePage