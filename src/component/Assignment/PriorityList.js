const PriorityList = (props) => {
    var rows = [];
    for ( var i = 0; i< props.choices.length; i++){
        rows.push(PriorityListRow(i, props.choices, props.name, props.handleChange));
    }
    return (
        <div className='row justify-content-center mx-5'>
            <div className='col-md-10 col my-4 p-4 border rounded shadow-sm'>
                <h4 className="problem-title">{props.title}</h4>
                <h5 className="problem-title">Urutkan berdasarkan prioritas tertinggi!</h5>
                <p className="problem-statement my-3">{props.problem}</p>
                <form className="multiple-choice">
                    {rows}
                </form>
            </div>
        </div>
    );
}

const PriorityListRow = (i, value, name, handleChange) => {
    return (
        <div>
            <select name={name} key={i} id={i} onChange={handleChange} className="my-1 py-1 px-2">
                <option selected disabled value="">Pilih salah satu jawaban</option>
                {value.map((val) => {
                    return (<option value={val}>{val}</option>)
                })}
            </select>
        </div>
        
    )
}

export default PriorityList;