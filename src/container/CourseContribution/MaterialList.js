import MaterialTable, { MTableToolbar } from "material-table";
import { Button } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../helper/isLoginContext";
import CourseService from '../../service/CourseService';
import NavBar from "../../component/Navbar/Navbar";

const MaterialList = () => {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
        fetchData();
    }, [isLoggedIn])

    async function fetchData(){
        const getQueryParam = new URLSearchParams(window.location.search);
        const cid = getQueryParam.get("cid");
        const sid = getQueryParam.get("sid");

        let result = await CourseService.getMaterial(cid, sid);
        result = await result.json();
        setMaterials(result.subSections);
    };

    const DetailButton = () => {
        return (
            <Button
                className="m-1 accButton"
                color="primary"
                size="small"
                variant="contained"
                width="30px"
            >Pratinjau</Button>
        )
    }

    return (
        <div className='test d-flex flex-column min-vh-100'>
            <NavBar/>
            <div className='row mx-3 mt-5'>
                <div className='col'>
                    <button className='actionButton f-btn btn btn-primary px-3 mx-5 border-0' onClick={() => navigate(-1)}>Kembali</button>
                </div>
            </div>
            <h1 className="mx-auto p-4">Daftar Materi</h1>
            <div className="row max-vw-100 adminMain">
                <div className="table-container">
                    <MaterialTable
                        title={""}
                        columns = {[
                            {title: 'No', render:(rowData)=>rowData.tableData.id+1, width:'1%'},
                            {title: 'Judul', field: 'materialName'},
                            {title: 'Tipe', field: 'materialType'}
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
                            width: '90%',
                            padding: '20px',
                            fontFamily: 'Raleway',
                            borderRadius: '20px',
                            marginLeft: '5%',
                            marginBottom: '8%',
                            marginRight: '-150px'
                        }}

                        data= {materials}

                        actions = {[
                            rowData => ({
                                icon: () => <DetailButton/>,
                                tooltip: 'Lihat Detail Kursus',
                                onClick: (event, rowData) => navigate("detail", { state:{detail: rowData} })
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
                                width: '100px',
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
    )
}

export default MaterialList;