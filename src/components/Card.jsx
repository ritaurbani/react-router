import { Link } from "react-router-dom";

function Card({ title, content, category, image, tags, id, onDelete }) {


    const apiBase = "http://localhost:3000";

    return (
        <div className='card mb-2'>
            <div className='card-body'>
                <h4>{title}</h4>
                <p>{content}</p>
                {/* <p>{category}</p> */}
                <img src={`${apiBase}/${image}`} alt=""
                    className='w-75 p-3' />
                    <div>
                        {tags.map((tag,index)=> (
                        <span className="me-2" key={index}>{tag}</span>
                        ))}
                    </div>
                <div>
                    <button className='m-2 btn btn-outline-success btn-sm'
                        onClick={onDelete}>Delete</button>
                    <Link className="btn btn-success" to={`/posts/${id}`}>Details</Link>    
                </div>
            </div>
        </div>
    )
}

export default Card