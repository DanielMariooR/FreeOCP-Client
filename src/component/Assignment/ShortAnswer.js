const ShortAnswer = (props) => {
    return (
        <div className='row justify-content-center mx-5'>
            <div className='col-md-10 col my-4 p-4 border rounded shadow-sm'>
                <h4 className="problem-title">{props.title}</h4>
                <p className="problem-statement my-3">{props.problem}</p>
                <form>
                    <input className="short-answer my-3" type="text" name ={props.name} onChange={props.handleChange} value={props.value}/>
                </form>
            </div>
        </div>
    )
}

export default ShortAnswer