import { useEffect, useState } from "react";
import '../../styles/CourseMaterial.css';

const Text = (props) => {
    const [material, setMaterial] = useState({
        name: "",
        img: "",
        text: ""
    })

    useEffect(() => {
        setMaterial({
            name: props.state.materialName,
            img: props.state.materialContent,
            text: props.state.materialContentText
        });
    }, [props])

    return (
        <div className="container p-5 shadow-sm border rounded">
            <h1 className="mb-4">{ material.name }</h1>
            <img src={ material.img } className="mx-auto my-5 d-block" />
            <div>
                <p className="text-justify">{ material.text }</p>
            </div>
            <button onClick={props.ended} className="f-btn btn btn-primary px-3 mt-5">Tandai Selesai</button>
        </div>
    )
}

export default Text;