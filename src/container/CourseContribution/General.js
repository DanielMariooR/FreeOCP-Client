import MaterialTable, { MTableToolbar } from "material-table";
import { Button } from '@material-ui/core';
import React from 'react';
import { Fragment, useEffect, useState } from "react";
import '../../styles/QuestionForm.css';
import CourseService from '../../service/CourseService';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../component/Navbar/Navbar";
import { useContext } from "react";
import { LoginContext } from "../../helper/isLoginContext";

const General = () => {
    let location = useLocation();
    let detail = location.state.detail;

    const navigate = useNavigate();
    const [syllabus, setSyllabus] = useState([]);
    const [cid, setCID] = useState("");
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)

    useEffect(() => {
        async function fetchData(){
            const getQueryParam = new URLSearchParams(window.location.search);
            const cid = getQueryParam.get("cid");
            setCID(cid);

            let result = await CourseService.getSyllabus(cid);
            result = await result.json();
            setSyllabus(result.Syllabus);
        }

        if(!isLoggedIn){
            navigate("/sign-in")
        }
        fetchData();
    }, [isLoggedIn])

    const handleChange = () => {
        // Need API
    }

    const AddMaterialButton = () => {
        return (
            <Button
                className="m-1 accButton"
                color="primary"
                size="small"
                variant="contained"
                width="30px"
            >Tambah Materi</Button>
        )
    }

    const AddAssignmentButton = () => {
        return (
            <Button
                className="m-1 accButton"
                color="primary"
                size="small"
                variant="contained"
                width="30px"
            >Tambah Kuis/Ujian</Button>
        )
    }

    const DetailMaterial = () => {
        return (
            <Button
                className="m-1 actionButton"
                color="primary"
                size="small"
                variant="contained"
                width="30px"
            >Daftar Materi</Button>
        )
    }

    return (
        <Fragment>
            <NavBar/>
            <div className="container my-3">
                <div className='row mx-3 my-5 justify-content-between'>
                    <div className='col-2'>
                        <button className='actionButton f-btn btn btn-primary px-3 border-0' onClick={() => navigate(-1)}>Kembali</button>
                    </div>
                </div>
            </div>
            <div className="row m-3">
                <div className="col text-center">
                    <h1>Informasi Umum</h1>
                </div>
            </div>
            <div className="container my-3 py-3 border shadow-sm rounded">
                <div className="question-form">
                    <div className="form-group row m-3">
                        <label className="col-sm-3 col-form-label">Judul</label>
                        <div className="col-sm-8 col-11">
                            <input type="text" disabled className="form-control shadow-none bg-white" value={detail.course_name}/>
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <label className="col-sm-3 col-form-label">Deskripsi</label>
                        <div className="col-sm-8 col-11">
                            <textarea className="form-control shadow-none bg-white" disabled rows="5" name="materialContentText" value={detail.description}></textarea>
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <label className="col-sm-3 col-form-label">Thumbnail</label>
                        <div className="col-sm-8 col-11">
                            <img src={detail.thumbnail} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <h1 className="text-center my-4">Subjudul</h1>
                <div className='test d-flex flex-column min-vh-100'>
                    <div className="row max-vw-100 adminMain">
                        <div className="table-container">
                            <MaterialTable
                                title={""}
                                columns = {[
                                    {title: 'No', render:(rowData)=>rowData.tableData.id+1, width:'1%'},
                                    {title: 'Subjudul', field: 'sectionName'}
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
                                    height: '80%',
                                    width: '100%',
                                    padding: '20px',
                                    fontFamily: 'Raleway',
                                    borderRadius: '20px',
                                    marginBottom: '8%'
                                }}

                                data= {syllabus}

                                actions = {[
                                    rowData => ({
                                        icon: () => <AddMaterialButton/>,
                                        tooltip: 'Tambah materi',
                                        onClick: (event, rowData) => navigate("/create-course-material?sid=" + rowData.sectionID)
                                    }),
                                    rowData => ({
                                        icon: () => <AddAssignmentButton/>,
                                        tooltip: 'Tambah kuis/ujian',
                                        onClick: (event, rowData) => navigate("/create-assignment?sid=" + rowData.sectionID)
                                    }),
                                    rowData => ({
                                        icon: () => <DetailMaterial/>,
                                        tooltip: 'Lihat daftar materi',
                                        onClick: (event, rowData) => navigate("/my-courses/materials?cid=" + cid + "&sid=" + rowData.sectionID)
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
                                        width: '525px',
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
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default General;