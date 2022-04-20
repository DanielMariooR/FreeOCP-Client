import { useState } from "react";
import '../../styles/QuestionForm.css';
import CourseService from '../../service/CourseService';
import { Modal } from 'react-bootstrap';

const CourseMaterialForm = () => {
    const getQueryParam = new URLSearchParams(window.location.search);
    const initialValues = {
        materialName: "",
        materialType: "",
        materialContent: "",
        materialContentText: "",
        sectionID: getQueryParam.get("sid")
    }
    const [material, setMaterial] = useState(initialValues);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setMaterial(initialValues);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaterial({ ...material, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (material.materialType == "text") {
            // No image yet
            setMaterial({ ...material, materialContent: "" });
        }
        else if (material.materialType == "video") {
            setMaterial({ ...material, materialContentText: "" });
        }
        createMaterial();
    }

    async function createMaterial() {
        let result = await CourseService.createMaterial(material);
        result = await result.json();
        if (result.status == "Success") {
            handleShow();
        }
    }

    return (
        <>
            <form className="question-form" onSubmit={handleSubmit}>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Judul Materi</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" required className="form-control shadow-none" placeholder="Isikan judul materi" name="materialName" onChange={handleChange} value={material.materialName}/>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Jenis Materi</label>
                    <div className="col-sm-8 col-11">
                        <select className="form-select custom-dropdown shadow-none" required name="materialType" onChange={handleChange} value={material.materialType}>
                            <option selected disabled value="">Pilih jenis materi</option>
                            <option value="text">Teks</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                </div>
                {material.materialType == "video" &&
                    <div className="form-group row m-3">
                        <label className="col-sm-3 col-form-label">Link Video</label>
                        <div className="col-sm-8 col-11">
                            <input type="text" required className="form-control shadow-none" placeholder="Isikan tautan video" name="materialContent" onChange={handleChange} value={material.materialContent}/>
                        </div>
                    </div>
                }
                {material.materialType == "text" &&
                    <div className="form-group row m-3">
                        <label className="col-sm-3 col-form-label">Isi Teks</label>
                        <div className="col-sm-8 col-11">
                            <textarea className="form-control shadow-none" placeholder="Isikan teks materi..." rows="15" name="materialContentText" onChange={handleChange} value={material.materialContentText}></textarea>
                        </div>
                    </div>
                }
                <button type="submit" className="q-btn btn text-white m-5 shadow-none px-4">Submit</button>
            </form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Materi Kursus Berhasil Ditambahkan!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Detail kursus dapat dilihat pada profil Anda</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="q-btn btn btn-primary" onClick={handleClose}>Selesai</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CourseMaterialForm;