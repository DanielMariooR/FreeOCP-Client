import { Fragment, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import '../../styles/QuestionForm.css';
import ProblemService from '../../service/ProblemService';
import { Modal } from 'react-bootstrap';

const QuestionForm = () => {
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("");
    const [question, setQuestion] = useState("");
    const [essay, setEssay] = useState("");
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [options, setOptions] = useState([
        { option: '', value: 0 }
    ]);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleAddFields = () => {
        const values = [...options];
        values.push({ option: '', value: 0 });

        setOptions(values);
        setError("");
    }

    const handleRemoveFields = (idx) => {
        const values = [...options];
        if (values[idx].value == 1) {
            setError("Kunci jawaban tidak dapat dihapus");
        }
        else {
            values.splice(idx, 1);
            setError("");
        }

        setOptions(values);
    }

    const handleOptionChange = (e, idx) => {
        const values = [...options];
        values[idx].option = e.target.value;

        setOptions(values);
        setError("");
    }

    const handleAnswerChangeMC = (idx) => {
        const values = [...options];
        values.map(e => e.value = 0);
        values[idx].value = 1;

        setOptions(values);
        setError("");
    }

    const handleAnswerChangeCheckbox = (e, idx) => {
        const values = [...options];
        if (e.target.checked) {
            values[idx].value = 1;
        }
        else {
            values[idx].value = 0;
        }
        setError("");

        setOptions(values);
    }

    const checkOption = () => {
        let answered = true;
        let answer = options.filter(choice => choice.value == 1);
        if (answer.length == 0) {
            answered = false;
        }
        return answered;
    }

    const handleSubmit = (e) => {
        let isAnswered = checkOption();
        if ((type == "pilgan" || type == "checkbox") && !isAnswered) {
            setError("Isikan kunci jawaban");
        }
        else {
            addProblem();
        }
        e.preventDefault();
    }

    async function addProblem() {
        let formValues = {};
        if (type == "isian") {
            formValues = {
                title: title,
                type: type,
                topic: topic,
                difficulty: difficulty,
                content: {
                    question: question,
                    choice: [essay],
                    answer: [Number(caseSensitive)]
                }
            }
        }
        else {
            formValues = {
                title: title,
                type: type,
                topic: topic,
                difficulty: difficulty,
                content: {
                    question: question,
                    choice: options.map(choice => choice.option),
                    answer: options.map(choice => choice.value)
                }
            }
        }

        let result = await ProblemService.createProblem(formValues);
        result = await result.json();
        if (result.status == "Success") {
            handleShow();
        }
    }

    return (
        <>
            <form className="question-form" onSubmit={handleSubmit}>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Judul</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" required className="form-control shadow-none" placeholder="Isikan judul" onChange={e => setTitle(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Jenis Pertanyaan</label>
                    <div className="col-sm-8 col-11">
                        <select className="form-select custom-dropdown shadow-none" required onChange={e => setType(e.target.value)}>
                            <option selected disabled value="">Pilih jenis pertanyaan</option>
                            <option value="isian">Isian singkat</option>
                            <option value="pilgan">Pilihan ganda</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="plist">Daftar prioritas</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Topik</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" required className="form-control shadow-none" placeholder="Isikan topik" onChange={e => setTopic(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Tingkat kesulitan</label>
                    <div className="col-sm-8 col-11">
                        <select className="form-select custom-dropdown shadow-none" required onChange={e => setDifficulty(e.target.value)}>
                            <option selected disabled value="">Pilih tingkat kesulitan</option>
                            <option value="mudah">Mudah</option>
                            <option value="sedang">Sedang</option>
                            <option value="sulit">Sulit</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Pertanyaan</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" required className="form-control shadow-none" placeholder="Isikan pertanyaan" onChange={e => setQuestion(e.target.value)} />
                    </div>
                </div>
                {type == "" &&
                    <div className="form-group row m-3">
                        <label className="col-sm-3 col-form-label">Kunci Jawaban</label>
                        <div className="col-sm-8 col-11">
                            <input type="text" readOnly className="form-control shadow-none bg-white border-white" value="-" />
                        </div>
                    </div>
                }
                {type == "isian" &&
                    <Fragment>
                        <div className="form-group row m-3">
                            <label className="col-sm-3 col-form-label">Kunci Jawaban</label>
                            <div className="col-sm-8 col-11">
                                <input type="text" required className="form-control shadow-none" placeholder="Isikan kunci jawaban" onChange={e => setEssay(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row m-3">
                            <label className="col-sm-3 col-6 col-form-label">Case Sensitive</label>
                            <div className="col-1">
                                <button className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                                    <input type="checkbox" className="form-check-input form-control h-75 shadow-none" onChange={e => setCaseSensitive(e.target.checked)} />
                                </button>
                            </div>
                        </div>
                    </Fragment>
                }
                {type == "pilgan" &&
                    <Fragment>
                        <div className="form-group row mx-3 justify-content-end">
                            <label className="col-sm-3 col-form-label">Opsi Jawaban</label>
                            {options.map((option, idx) => (
                                <Fragment key={`${option}~${idx}`}>
                                    <div className="col-sm-8 col-11 mb-3">
                                        <input type="text" required className="form-control shadow-none" value={option.option} placeholder="Isikan opsi jawaban" onChange={e => handleOptionChange(e, idx)} />
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
                            <div className="col-sm-3"></div>
                            <div className="col-sm-1">
                                <button onClick={() => handleAddFields()} className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                                    <FontAwesomeIcon icon={faSquarePlus} className="fa-2x add-input" />
                                </button>
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9 answer-error">{error}</div>
                        </div>
                        <div className="form-group row m-3">
                            <label className="col-sm-3 col-form-label">Kunci Jawaban</label>
                            <div className="col-sm-8 col-11">
                                <select className="form-select custom-dropdown shadow-none" required onChange={(e) => handleAnswerChangeMC(e.target.value)}>
                                    <option selected disabled hidden value="-1">Pilih kunci jawaban</option>
                                    {options.map((option, idx) => (
                                        <Fragment key={`${option}~${idx}`}>
                                            <option value={idx}>{option.option}</option>
                                        </Fragment>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Fragment>
                }
                {type == "checkbox" &&
                    <Fragment>
                        <div className="form-group row mx-3 justify-content-end">
                            <label className="col-sm-3 col-form-label">Opsi Jawaban</label>
                            {options.map((option, idx) => (
                                <Fragment key={`${option}~${idx}`}>
                                    <div className="col-sm-8 col-11 mb-3">
                                        <input type="text" required className="form-control shadow-none" value={option.option} placeholder="Isikan opsi jawaban" onChange={e => handleOptionChange(e, idx)} />
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
                            <div className="col-sm-3"></div>
                            <div className="col-sm-1">
                                <button onClick={() => handleAddFields()} className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                                    <FontAwesomeIcon icon={faSquarePlus} className="fa-2x add-input" />
                                </button>
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9 answer-error">{error}</div>
                        </div>
                        <div className="form-group row m-3 justify-content-end">
                            <label className="col-sm-3 col-form-label">Kunci Jawaban</label>
                            {options.map((option, idx) => (
                                <Fragment key={`${option}~${idx}`}>
                                    <div className="col-sm-8 col-11 mb-3">
                                        <input type="text" disabled required className="form-control shadow-none bg-white" value={option.option} placeholder="Isikan opsi jawaban" onChange={e => handleOptionChange(e, idx)} />
                                    </div>
                                    <div className="col-1 mb-3">
                                        <button className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                                            <input type="checkbox" className="form-check-input form-control h-75 shadow-none" onChange={e => handleAnswerChangeCheckbox(e, idx)} />
                                        </button>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </Fragment>
                }
                {type == "plist" &&
                    <Fragment>
                        <div className="form-group row mx-3 justify-content-end">
                            <label className="col-sm-3 col-form-label">Kunci Jawaban</label>
                            <label className="col-sm-9">Diurutkan dari prioritas tertinggi:</label>
                            {options.map((option, idx) => (
                                <Fragment key={`${option}~${idx}`}>
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-8 col-11 mb-3">
                                        <input type="text" required className="form-control shadow-none" value={option.option} placeholder="Isikan kunci jawaban" onChange={e => handleOptionChange(e, idx)} />
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
                            <div className="col-sm-3"></div>
                            <div className="col-sm-1">
                                <button onClick={() => handleAddFields()} className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                                    <FontAwesomeIcon icon={faSquarePlus} className="fa-2x add-input" />
                                </button>
                            </div>
                        </div>
                    </Fragment>
                }
                <button type="submit" className="q-btn btn text-white m-5 shadow-none px-4">Submit</button>
            </form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Soal Berhasil Ditambahkan!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Status soal dapat dilihat pada profil Anda</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="q-btn btn btn-primary" onClick={handleClose}>Selesai</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QuestionForm;