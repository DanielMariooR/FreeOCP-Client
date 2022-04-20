import MaterialTable, { MTableToolbar } from "material-table";
import React from 'react';
import { setAuthHeader } from '../../helper/auth';
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../helper/isLoginContext";
import NavBar from "../../component/Navbar/Navbar";
import CourseService from "../../service/CourseService";


const CreateAssignment = () => {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [choosedProblems, setChoosedProblems] = useState([]);
    const initialValues = { difficulty: "", category: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);   
    const [payload, setPayload] = useState({"desc": {"title": "", "duration": 0}, "list_problem_id": []})

    const getQueryParam = new URLSearchParams(window.location.search);
    const materialInitialValues = {
        materialName: "",
        materialType: "",
        materialContent: "",
        materialContentText: "",
        sectionID: getQueryParam.get("sid")
    }
    const [material, setMaterial] = useState(materialInitialValues);

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
        fetchData("","");
    }, [isLoggedIn])

    const handleFilter = (e) => {
        e.preventDefault();
        fetchData(formValues.difficulty, formValues.category);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createAssignment();
        ;
    }

    async function fetchData(difficulty, category){//bakal diganti ama yang baru, kumpulan problem yang udah diacc
        var url = "http://localhost:8001/v1/problem/?";
        if (difficulty != "") url += "difficulty=" + difficulty;
        if (category != "") url += "&category="+category;

        let result = await fetch(url, {
            method: 'GET',
            headers: setAuthHeader(),
        });
        result = await result.json();
        //console.log("result ", result)
        setProblems(result.Problems)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        if(material.materialType != ""){
            createMaterialAssignment()
            setMaterial(materialInitialValues)
        }
    }, [material]
    )

    async function createAssignment(){
        const headers = setAuthHeader();
        headers["Accept"] = "application/json";
        let result = await fetch("http://localhost:8001/v1/assignment/create", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });
        result = await result.json();
        setMaterial({...material, materialName: payload.desc.title, materialType: "assignment", materialContent: result.assignmentID})
        console.log(material)
    }
    async function createMaterialAssignment() {
        let result = await CourseService.createMaterial(material);
        result = await result.json();
        if (result.status == "Success") {
            alert("silakan cek di bagian material, sudah dibuat")
        }
    }

    const addToChoosedProblem = (e, rowData) => {
        e.preventDefault();
        const payloadValues = {...payload};
        let problem_ids = payloadValues.list_problem_id;
        problem_ids.push({"problem_id": rowData.id});
        //console.log(payload.list_problem_id);
        setPayload({...payload, list_problem_id:problem_ids})
        
        const values = [...choosedProblems];
        let newIndex = values.length;
        let newData = {"id": rowData.id, "title": rowData.title, "topic": rowData.topic, "tableData":{"id": newIndex}, "difficulty": rowData.difficulty}
        values.push(newData);
        setChoosedProblems(values);
    }

    const removeFromChoosedProblem = (e, index) => {
        e.preventDefault();
        //console.log(index);
        const values = [...choosedProblems];
        values.splice(index, 1);
        setChoosedProblems(values);
    }


    return (
        <div className='d-flex flex-column min-vh-100'>
            <NavBar/>
            
            <div className = "container py-5">
                <div className='row justify-content-center my-5 mx-2'>
                    <div className='col'>
                        <button className='actionButton f-btn btn btn-primary px-3 border-0' onClick={() => navigate(-1)}>Kembali</button>
                    </div>
                </div>
                <h1 className="pb-6, px-3">Create Assignment</h1>
                <form className="question-form" onSubmit={handleSubmit}>
                    <div className="form-group row m-3">
                        <label className="col-sm-3 col-form-label">Judul Assignment</label>
                        <div className="col-sm-8 col-11">
                            <input type="text" required className="form-control shadow-none" placeholder="Isikan judul tes" onChange={e => {
                                let newDesc = {...payload}.desc
                                newDesc.title = e.target.value;
                                setPayload({...payload, desc: newDesc})
                            }} />
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <label className="col-sm-3 col-form-label">Waktu Pengerjaan (detik)</label>
                        <div className="col-sm-8 col-11">
                            <input type="number" required className="form-control shadow-none" placeholder="Isikan waktu pengerjaan" onChange={e => {
                                let newDesc = {...payload}.desc
                                newDesc.duration = parseInt(e.target.value);
                                setPayload({...payload, desc: newDesc})
                            }} />
                        </div>
                    </div>
                    
                
                    <div className="form-group row">
                        <h3 className="mx-3">Soal Terpilih</h3>
                        <MaterialTable
                            title={""}
                            columns = {[
                                {title: 'No', render:(rowData)=>rowData.tableData.id+1, width:'1%'},
                                {title: 'Nama Soal', field: 'title'},
                                {title: 'Kategori', field: 'topic'},
                                {title: 'Tingkat Kesulitan', field: 'difficulty'},
                            ]}

                            components={{
                                Toolbar: props => (
                                <div
                                    style={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontSize: '18px',
                                    marginBottom: '20px'
                                    }}
                                >
                                    <MTableToolbar {...props} />
                                </div>
                                )
                            }}
                
                            style= {{
                                height: '85%',
                                width: '90%',
                                padding: '20px',
                                fontFamily: 'Raleway',
                                borderRadius: '20px',
                                marginTop: '1%',
                                marginLeft: '4%',
                                marginBottom: '3%',
                                marginRight: '-150px'
                            }}

                            data= {choosedProblems}

                            actions = {[
                                rowData => ({
                                    icon: () => <RemoveButton/>,
                                    tooltip: 'Terima Soal',
                                    onClick: (event, rowData) => {
                                        removeFromChoosedProblem(event, rowData.tableData.id);
                                    }
                                }),
                                rowData => ({
                                    icon: () => <DetailButton/>,
                                    tooltip: 'Lihat Detail Soal',
                                    onClick: (event, rowData) => window.open("../problem?id=" + rowData.id)
                                })
                            ]}

                            options = {{
                                actionsColumnIndex: -1,
                                pageSize: 10,
                                pageSizeOptions: [],
                                minBodyHeight: '0%',
                                headerStyle: {
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold',
                                },
                                rowStyle: {
                                    backgroundColor: 'white'
                                },
                                fontSize: '18px',
                                actionsCellStyle: {
                                    width: '340px',
                                    marginRight: '20px'
                                },
                                searchFieldStyle: {
                                    height: '30px',
                                    fontSize: '20px',
                                    clear: 'none',
                                    marginLeft: '-40px'
                                }
                            }}
                        />
                    </div>
                    

                    <div className="form-group row max-vw-100 position-relative">
                        <h3>Pilih soal dari: </h3>
                        <div className="table-container col-10">
                        <MaterialTable
                            title={""}
                            columns = {[
                                {title: 'No', render:(rowData)=>rowData.tableData.id+1, width:'1%'},
                                {title: 'Nama Soal', field: 'title'},
                                {title: 'Kategori', field: 'topic'},
                                {title: 'Tingkat Kesulitan', field: 'difficulty'},
                            ]}

                            components={{
                                Toolbar: props => (
                                <div
                                    style={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontSize: '18px',
                                    marginBottom: '20px'
                                    }}
                                >
                                    <MTableToolbar {...props} />
                                </div>
                                )
                            }}
                
                            style= {{
                                height: '85%',
                                width: '90%',
                                padding: '20px',
                                fontFamily: 'Raleway',
                                borderRadius: '20px',
                                marginTop: '3%',
                                marginLeft: '4%',
                                marginBottom: '3%',
                                marginRight: '-150px'
                            }}

                            data= {problems}

                            actions = {[
                                rowData => ({

                                    icon: () => <AccButton/>,
                                    tooltip: 'Pakai Soal',
                                    onClick: (event, rowData) => {
                                        addToChoosedProblem(event, rowData);
                                        //console.log(rowData)
                                    }
                                }),
                                rowData => ({
                                    icon: () => <DetailButton/>,
                                    tooltip: 'Lihat Detail Soal',
                                    onClick: (event, rowData) => window.open("../problem?id=" + rowData.id)
                                })
                            ]}

                            options = {{
                                actionsColumnIndex: -1,
                                pageSize: 10,
                                pageSizeOptions: [],
                                minBodyHeight: '100%',
                                headerStyle: {
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold',
                                },
                                rowStyle: {
                                    backgroundColor: 'white'
                                },
                                fontSize: '18px',
                                actionsCellStyle: {
                                    width: '340px',
                                    marginRight: '20px'
                                },
                                searchFieldStyle: {
                                    height: '30px',
                                    fontSize: '20px',
                                    clear: 'none',
                                    marginLeft: '-40px'
                                }
                            }}
                        />
                        </div>
                        <div className="container filterBox col-2">
                            <form className="filterForm d-flex flex-column">
                                <h3 className="filterTitle">Filter</h3>
                                <label className="m-2" for="fname">Kategori</label>
                                <input className="filterInput" type="text" name="category" autoComplete="off" onChange={handleChange} value={formValues.category}></input>
                                <label className="m-2" for="fname">Kesulitan</label>
                                <input className="filterInput" type="text" name="difficulty" autoComplete="off" onChange={handleChange} value={formValues.difficulty}></input>
                                <input className="filterButton m-3" type='submit' name='fetch' value='Apply' onClick={handleFilter}/>
                            </form>
                        </div>
                    </div>
                    <button type="submit" className="q-btn float-none btn row m-3 text-white shadow-none mx-5 px-4">Buat Tes</button>
                                        
                </form>

            </div>
                
                
        </div>
    )
}

const AccButton = () => {
    return (
        <Button
            className="m-1 accButton"
            color="primary"
            size="small"
            variant="contained"
            width="30px"
        >Pakai Soal</Button>
    )
}

const DetailButton = () => {
    return (
        <Button
            className="m-1 actionButton"
            color="primary"
            size="small"
            variant="contained"
            width="30px"
            backgroundColor="#F93238"
        >Lihat Soal</Button>
    )
}
const RemoveButton = () => {
    return (
        <Button
            className="m-1 accButton"
            color="primary"
            size="small"
            variant="contained"
            width="30px"
        >Tidak Pakai Soal</Button>
    )
}

export default CreateAssignment