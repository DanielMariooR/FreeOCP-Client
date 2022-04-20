import { useEffect, useState } from "react";
import '../../styles/CourseMaterial.css';

const Video = (props) => {
    const [material, setMaterial] = useState({
        name: "",
        video: ""
    })

    useEffect(() => {
        setMaterial({
            name: props.state.materialName,
            video: props.state.materialContent.replace("watch?v=", "embed/")
        });
    }, [props])

    return (
        <div className="container p-5 shadow-sm border rounded">
            <h1 className="mb-4">{ material.name }</h1>
            <div className="ratio ratio-16x9">
                <iframe src={ material.video } allowFullScreen></iframe>
            </div>
            <button onClick={props.ended} className="f-btn btn btn-primary px-3 mt-5">Tandai Selesai</button>
        </div>
    )
}

export default Video;