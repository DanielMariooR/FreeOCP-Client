import { useEffect, useState } from "react";
import '../../styles/CourseMaterial.css';
import { Link } from 'react-router-dom';

const Assignment = (props) => {
    const [material, setMaterial] = useState({
        id: "",
        name: "",
        score: ""
    })

    useEffect(() => {
        if (props.state.materialScore == "") {
            setMaterial({
                id: props.state.materialID,
                name: props.state.materialName,
                score: "-"
            });
        }
        else {
            setMaterial({
                id: props.state.materialID,
                name: props.state.materialName,
                score: props.state.materialContent
            });
        }
    }, [props])

    return (
        <div className="container p-5 shadow-sm border rounded">
            <h1 className="mb-5">{ material.name }</h1>
            <hr/>
            <div className="row my-5">
                <div className="col-7">
                    <h4 className="mb-4">Nilai Lulus</h4>
                    <p><b>Minimum</b> &nbsp;&nbsp;&nbsp; 80% atau lebih tinggi</p>
                </div>
                <div className="col-5 myscore px-4">
                    <h4 className="mb-4">Nilai Anda</h4>
                    <p><b>{ material.score }</b></p>
                </div>
            </div>
            <hr/>
            <div className="row my-5">
                <div className="col">
                    <Link to={ "/assignment/" + material.id} className="q-btn btn btn-primary px-4">Mulai Tes</Link>
                </div>
            </div>
        </div>
    )
}

export default Assignment;