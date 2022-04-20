const CheckBox = (props) => {
    var rows = [];
    for ( var i = 0; i< props.choices.length; i++){
        rows.push(CheckBoxRow(i, props.choices[i], props.name, props.handleChange));
    }

    return(
        <div className='row justify-content-center mx-5'>
            <div className='col-md-10 col my-4 p-4 border rounded shadow-sm'>
                <h4 className="problem-title">{props.title}</h4>
                <p className="problem-statement my-3">{props.problem}</p>
                <form className="multiple-choice">
                    {rows}
                </form>
            </div>
        </div>
    );
}

const CheckBoxRow = (i, value, name, handleChange) => {
    return (
        <div><input className="my-3" type="checkbox" name ={name} value={i} onChange={handleChange}/> <span>{value}</span> <br /></div>
    )
}

export default CheckBox