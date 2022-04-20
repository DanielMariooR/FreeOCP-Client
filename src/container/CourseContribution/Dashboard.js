import MaterialTable, { MTableToolbar } from "material-table";
import { Button } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../helper/isLoginContext";
import CourseService from '../../service/CourseService';
import NavBar from "../../component/Navbar/Navbar";


const Dashboard = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
        fetchData();
    }, [isLoggedIn])

    async function fetchData(){
        let result = await CourseService.getContributedCourse();
        result = await result.json();
        setCourses(result);
    };

    const DetailButton = () => {
        return (
            <Button
                className="m-1 accButton"
                color="primary"
                size="small"
                variant="contained"
                width="30px"
            >Lihat</Button>
        )
    }

    return (
        <div className='test d-flex flex-column min-vh-100'>
            <NavBar/>
            <h1 className="text-center mt-5 mb-3">Kursus Saya</h1>
            <div className="row max-vw-100 adminMain">
                <div className="table-container">
                    <MaterialTable
                        title={""}
                        columns = {[
                            {title: 'No', render:(rowData)=>rowData.tableData.id+1, width:'1%'},
                            {title: 'Judul', field: 'course_name'},
                            {title: 'Deskripsi', field: 'description'}
                            // No course status yet
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

                        data= {courses}

                        actions = {[
                            rowData => ({
                                icon: () => <DetailButton/>,
                                tooltip: 'Lihat Detail Kursus',
                                onClick: (event, rowData) => navigate("detail?cid=" + rowData.id, { state:{detail: rowData} })
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

export default Dashboard;