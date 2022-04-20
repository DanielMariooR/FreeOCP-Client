import { Link } from 'react-router-dom';

function Card(props) {

    return (
        <div className="col-md-6 col-xl-3">
            <div className="card position-relative px-0 pb-5 mx-auto my-3">
                <Link to="/detail-course" state={{id: props.id}} className='text-decoration-none text-muted'>
                    <img className="card-img-top" src={ props.thumbnail } alt="Course Preview" />
                    <img className="img-thumbnail position-absolute card-creator" src={ props.profpic } alt="Creator Profile" />
                    <div className="card-body">
                        <h5 className="card-title">{ props.title }</h5>
                        <p className="card-text">{ props.creator }</p>
                    </div>
                </Link>
            </div>
        </div>   
    )
}

export default Card;