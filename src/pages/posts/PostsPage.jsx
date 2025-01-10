import { useEffect, useState } from 'react'
import Card from "../../components/Card"
import axios from "axios"
import PostCreatePage from './PostCreatePage'
import { Link } from 'react-router-dom'


//DATI, FILTRO (FORM LO METTO IN UN ALTRA PAGINA)
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
                <h2 className='text-center my-4'>Il mio Blog</h2>
                {/*per affiancare tab and btn */}
                <section className='d-flex justify-content-between align-items-center'>
                    <div>
                        <select className='mb-4' name="tag" id="" value={filter} onChange={(event) => setFilter(event.target.value)}>
                            <option value="all">Tutte</option>
                            {tags.map((curTag, index) => <option key={index} value={curTag}> {curTag}</option>)}
                        </select>
                    </div>

                <Link className='mb-3 btn btn-success' to="/posts/create"> Aggiungi un Post </Link>
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
            </div >
        </>
    );
}

export default PostsPage;
