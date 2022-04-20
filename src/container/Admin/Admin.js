import MaterialTable, { MTableToolbar } from "material-table";
import AdminNav from '../../component/AdminNav/AdminNav';
import React from 'react';
import { setAuthHeader } from '../../helper/auth';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../helper/isLoginContext";
import ProblemService from '../../service/ProblemService';


const Admin = () => {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const initialValues = { difficulty: "", category: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
        fetchData("","");
    }, [isLoggedIn])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(formValues.difficulty, formValues.category);
    };

    async function fetchData(difficulty, category){
        var url = "http://localhost:8001/v1/problem/candidate?";
        if (difficulty != "") url += "difficulty=" + difficulty;
        if (category != "") url += "&category="+category;

        let result = await fetch(url, {
            method: 'GET',
            headers: setAuthHeader(),
        });
        result = await result.json();
        setProblems(result.Problems)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    async function handleAccept(id) {
        var result = await ProblemService.acceptProblemCandidate(id);
        fetchData(formValues.difficulty, formValues.category);
        console.log(result);
    };

    async function handleReject(id) {
        var result = await ProblemService.rejectProblemCandidate(id);
        fetchData(formValues.difficulty, formValues.category);
        console.log(result);
    };

    return (
        <div className='test d-flex flex-column min-vh-100'>
            <AdminNav/>
            <div className="row max-vw-100 adminMain">
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
                        marginBottom: '8%',
                        marginRight: '-150px'
                    }}

                    data= {problems}

                    actions = {[
                        rowData => ({
                            icon: () => <AccButton/>,
                            tooltip: 'Terima Soal',
                            onClick: (event, rowData) => {
                                handleAccept(rowData.id);
                            }
                        }),
                        rowData => ({
                            icon: () => <DetailButton/>,
                            tooltip: 'Lihat Detail Soal',
                            onClick: (event, rowData) => navigate("review?id=" + rowData.id)
                        }),
                        rowData => ({
                            icon: () => <RejectButton/>,
                            tooltip: 'Tolak Soal',
                            onClick: (event, rowData) => {
                                handleReject(rowData.id);
                            }
                        }),
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
                    <input className="filterButton m-3" type='submit' name='fetch' value='Apply' onClick={handleSubmit}/>
                </form>
            </div>
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
        >Terima</Button>
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
        >Lihat</Button>
    )
}

const RejectButton = () => {
    return (
        <Button
            className="m-1 actionButton"
            color="primary"
            size="small"
            variant="contained"
            width="30px"
            backgroundColor="#F93238"
        >Tolak</Button>
    )
}

export default Admin