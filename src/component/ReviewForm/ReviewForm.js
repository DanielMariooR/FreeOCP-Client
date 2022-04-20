import { Fragment, useEffect, useState, useContext } from "react";
import '../../styles/QuestionForm.css';
import ProblemService from '../../service/ProblemService';
import { LoginContext } from "../../helper/isLoginContext";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();
    const{isLoggedIn, setIsLoggedIn} = useContext(LoginContext);

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
    }, [isLoggedIn]);

    useEffect(() => {
        async function fetchData(){
            const getQueryParam = new URLSearchParams(window.location.search);
            const id = getQueryParam.get("id");

            let result = await ProblemService.getProblemById(id);
            result = await result.json();
            setTitle(result.title);
            setTopic(result.topic);
            setDifficulty(result.difficulty);
            setType(result.type);
            setQuestion(result.content.question);
            var items = result.content.choice.length;
            var choices = [];
            for (let i = 0; i < items; i++) {
                var choice = {option: '', value: 0};
                choice.option = result.content.choice[i];
                choice.value = result.content.answer[i];
                choices.push(choice);
            }
            setOptions(choices);
            console.log(result);
            console.log(choices);
        }

        fetchData();
    }, [])

    return (
        <>
            <div className="question-form">
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Judul</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" disabled className="form-control shadow-none bg-white" value={title}/>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Jenis Pertanyaan</label>
                    <div className="col-sm-8 col-11">
                        <select disabled className="form-select custom-dropdown shadow-none bg-white" value={type}>
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
                        <input type="text" disabled className="form-control shadow-none bg-white" value={topic}/>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Tingkat kesulitan</label>
                    <div className="col-sm-8 col-11">
                        <select className="form-select custom-dropdown shadow-none bg-white" disabled value={difficulty}>
                            <option value="mudah">Mudah</option>
                            <option value="sedang">Sedang</option>
                            <option value="sulit">Sulit</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Pertanyaan</label>
                    <div className="col-sm-8 col-11">
                        <input type="text" disabled className="form-control shadow-none bg-white" value={question}/>
                    </div>
                </div>
                {type == "isian" &&
                    <Fragment>
                        {options.map((option, idx) => (
                            <Fragment key={`${option}~${idx}`}>
                                <div className="form-group row m-3">
                                    <label className="col-sm-3 col-form-label">Kunci Jawaban</label>
                                    <div className="col-sm-8 col-11">
                                        <input type="text" disabled className="form-control shadow-none bg-white" value={option.option}/>
                                    </div>
                                </div>
                                <div className="form-group row m-3">
                                    <label className="col-sm-3 col-6 col-form-label">Case Sensitive</label>
                                    <div className="col-1">
                                        <button className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                                            {option.value == 1
                                            ?
                                                <input className="form-check-input form-control h-75 shadow-none" type="checkbox" checked disabled/>
                                            :
                                                <input type="checkbox" disabled className="form-control h-75 shadow-none bg-white"/>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </Fragment>
                }
                {(type == "checkbox" || type == "pilgan") &&
                    <Fragment>
                        <div className="form-group row mx-3 justify-content-end">
                            <label className="col-sm-3 col-form-label">Opsi Jawaban</label>
                            {options.map((option, idx) => (
                                <Fragment>
                                    <div className="col-sm-8 col-11 mb-3">
                                        <input type="text" disabled className="form-control shadow-none bg-white" value={option.option}/>
                                    </div>
                                    <div className="col-1"></div>
                                </Fragment>
                            ))}
                        </div>
                        <div className="form-group row m-3 justify-content-end">
                            <label className="col-sm-3 col-form-label">Kunci Jawaban</label>
                            {options.map((option, idx) => (
                                <Fragment key={`${option}~${idx}`}>
                                    <div className="col-sm-8 col-11 mb-3">
                                        <input type="text" disabled className="form-control shadow-none bg-white" value={option.option}/>
                                    </div>
                                    <div className="col-1 mb-3">
                                        <button className="bg-white border-0 h-100 d-flex flex-wrap align-items-center">
                                            {option.value == 1
                                            ?
                                                <input className="form-check-input form-control h-75 shadow-none" type="checkbox" checked disabled/>
                                            :
                                                <input type="checkbox" disabled className="form-control h-75 shadow-none bg-white"/>
                                            }
                                        </button>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </Fragment>
                }
                {type == "plist" &&
                    <Fragment>
                        <div className="form-group row mx-3">
                            <label className="col-sm-3 col-form-label">Kunci Jawaban</label>
                            <label className="col-sm-9">Diurutkan dari prioritas tertinggi:</label>
                            {options.map((option, idx) => (
                                <Fragment key={`${option}~${idx}`}>
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-8 col-11 mb-3">
                                        <input type="text" disabled className="form-control shadow-none bg-white" value={option.option}/>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </Fragment>
                }
            </div>
        </>
    )
}

export default ReviewForm;