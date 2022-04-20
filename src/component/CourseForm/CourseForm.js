import '../../styles/QuestionForm.css';
import CourseService from '../../service/CourseService';
import { Modal } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CourseForm = () => {
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [descr, setDescr] = useState("");
    const [show, setShow] = useState(false);

    const [image, setImage] = useState(null);

    const [sections, setSections] = useState([{
        sectionName: ""
    }]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate("/my-courses")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCourse();
        handleShow();
    }

    const handleAddSection = () => {
        const values = [...sections]
        values.push({
            sectionName: ""
        })

        setSections(values)
    }

    const handleRemoveFields = (idx) => {
        const values = [...sections];
        values.splice(idx, 1);

        setSections(values);
    }

    const handleSectionChange = (e, idx) => {
        const values = [...sections];
        values[idx].sectionName = e.target.value;

        setSections(values);
    }

    async function addCourse() {
        let resp = await CourseService.uploadImage(image)
        resp = await resp.json()

        let body = {
            course_name: title,
            topic: topic,
            description: descr,
            thumbnail: resp["imageURL"],
        }
        
        let result = await CourseService.createCourse(body);
        result = await result.json();

        if (result.status == "Success") {
            let list_section_id = []
            for (let i = 0; i < sections.length; i++) {
                body = {
                    courseID: result.id,
                    sectionName: sections[i].sectionName
                }
                let resp = await CourseService.createSection(body);
                resp = await resp.json();
                list_section_id.push(resp.id);
            }
            console.log(list_section_id)
        }
    }

    return (
        <>
            <form className="question-form" onSubmit={handleSubmit}>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Judul Kursus</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" required className="form-control shadow-none" placeholder="Isikan judul" onChange={e => setTitle(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Topik</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" required className="form-control shadow-none" placeholder="Isikan topik" onChange={e => setTopic(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Deskripsi</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" required className="form-control shadow-none" placeholder="Isikan deskripsi" onChange={e => setDescr(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">File Gambar</label>
                    <div className="col-sm-8 col-11">
                        <input type="file" required className="form-control shadow-none" placeholder="Isikan deskripsi" onChange={e => setImage(e.target.files[0])} />
                    </div>
                </div>

                <Fragment>
                    <div className="form-group row mx-3">
                        {sections.map((section, idx) => (
                            <Fragment key={`${section}~${idx}`}>
                                <label className="col-sm-3 col-form-label">Subjudul</label>
                                <div className="col-sm-8 col-11 mb-3">
                                    <input type="text" required className="form-control shadow-none" value={section.sectionName} placeholder="Isikan subjudul" onChange={e => handleSectionChange(e, idx)} />
                                </div>
                                <div className="col-1 mb-3">
                                    <button disabled={idx == 0} onClick={() => handleRemoveFields(idx)} className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                                        <FontAwesomeIcon icon={faSquareMinus} className="fa-2x remove-input" />
                                    </button>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                    <div className="row mx-3">
                        <div className="col-sm-1">
                        <button onClick={() => handleAddSection()} className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                            <FontAwesomeIcon icon={faSquarePlus} className="fa-2x add-input" />
                        </button>
                        </div>
                    </div>
                </Fragment>
            
                <button type="submit" className="q-btn btn text-white m-5 shadow-none px-4">Selanjutnya</button>
            </form>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kursus Berhasil Ditambahkan!</Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    )
}

export default CourseForm;