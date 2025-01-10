import { useEffect, useState } from 'react'
import Card from "./Card"
import axios from "axios"


function PostsPage() {


    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [filter, setFilter] = useState("all") //valore del filtro selezionato da utente

    const apiBase = "http://localhost:3000";

    //blocco di inizializzazione
    useEffect(() => {
        console.log("useEffect")
        getPosts();
    }, [filter]);

    useEffect(() => {
        getTags()
    }, []);

    //filtro i dati direttamente a livello di backend (nel server), tramite il parametro tag.
    const getPosts = () => {
        let url = `${apiBase}/posts`; // 
        //// Verifica se il filtro è diverso da "all" - il codice aggiunge un parametro alla query string dell'URL. per chiedere al server di restituire solo i dati che corrispondono al filtro.(tag=art)/tag=${filter}
        if (filter !== null && filter !== 'all') {
            // Se il filtro non è "all", aggiungi il parametro di query all'URL (filtra per tag)
            url += `?tags=${filter}`;
        }
        axios.get(url).then((resp) => { //Esegui la richiesta GET con l'URL costruito
            console.log("resp.data: ", resp.data);
            setPosts(resp.data) // setPosts(resp.data.posts || []) //Aggiorna lo stato 'posts' con l'elenco dei posts ricevute
        });
    }

    const getTags = () => {
        axios.get(`${apiBase}/tags`).then((resp) => {
            console.log(resp)
            setTags(resp.data.tags)
        })
    }

    //FUNZIONE ONCHANGE aggiorna il valore dell'input passato-event(obj)
    // const handleEventOnChange = (event) => {
    //     // const { name, type, value, checked} = event.target
    //     const keyToChange = event.target.name; //proprieta`nome - chiave dinamica
    //     let newValue;
    //     if (event.target.type === "checkbox") {
    //         newValue = event.target.checked;
    //     } else {
    //         newValue = event.target.value; //assegno valore a variabile newValue
    //     }
    //     console.log('formData: ', formData)//stato prima

    //     //creates a new object 
    //     const newData = {
    //         ...formData,
    //         //updates the specific field(keyToChange) with the new value(newValue).
    //         [keyToChange]: newValue, //override property title con quello che scrivo
    //     };
    //     console.log('new formData: ', newData)
    //     //Updates the state with the new form data/oggetto, causing the component to re-render.
    //     setFormData(newData); //rerender dell input finale
    // };

    //FUNZIONE FORM SUBMIT
    // const handlePostForm = (event) => {
    //     event.preventDefault();
    //     //I dati del form vengono inviati al backend tramite la chiamata axios.post.
    //     axios.post(`${apiBase}/posts`, formData).then((resp) => {
    //         //Il server salva il nuovo post e restituisce la risposta con i dati del post appena salvato.
    //         console.log(resp)
    //         // 2 creo la copia dell'array posts precedente, aggiungendo il nuovo post
    //         const newArray = [...posts, resp.data];
    //         // 3. L'array posts viene aggiornato con il nuovo post - setPosts sincronizza l'interfaccia utente ta con il backend
    //         setPosts(newArray);
    //         // 4. Ripulisco i campi del form reset back to initial values after the post has been added.
    //         setFormData(initialFormData);
    //     })
    // };

    ///////////////////  TAG ////////////////////////
    // const callbackSyncTags = (event) => {
    //     const { name, checked } = event.target;
    //     const newArray = checked  //creo nuovo array con elemento aggiunto o rimosso
    //         ? [...formData.tags, name]  // Se la checkbox è selezionata, aggiungi il tag all`array
    //         : formData.tags.filter((currElement) => currElement !== name); // Altrimenti, rimuovilo
    //     setFormData({
    //         ...formData,// Copia l'oggetto stato precedente
    //         tags: newArray, //aggiorna proprieta'tags con nuovo array
    //     });
    // };

    //filtering out the post with the id that matches the elementToRemove (passed as a parameter).
    const removeElement = (elementToRemoveId) => {
        //Make DELETE request to the server to remove the post
        axios.delete(`${apiBase}/posts/${elementToRemoveId}`).then((resp) => {
            //Filter out the post with the matching ID locally
            const newArray = posts.filter((curpost) => curpost.id !== elementToRemoveId);
            // Update the state with the new array (without the removed post)
            setPosts(newArray)
        })
    }


    return (
        <>
            <div className='container'>
                <h2 className='text-center mb-4'>Il mio Blog</h2>

                <section>
                    <select className='mb-4' name="tag" id="" value={filter} onChange={(event) => setFilter(event.target.value)}>
                        <option value="all">Tutte</option>
                        {tags.map((curTag, index) => <option key={index} value={curTag}> {curTag}</option>)}
                    </select>
                </section>







                {/* card */}

                <div className='row row-cols-2 row-cols-lg-3'>
                    {
                        posts.map((post, index) => (
                            <div className='col' key={index}>
                                <Card
                                    title={post.title}
                                    content={post.content}
                                    image={post.image}
                                    tags={post.tags}
                                    // category={post.category}
                                    id={post.id}
                                    onDelete={() => removeElement(post.id)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default PostsPage;
