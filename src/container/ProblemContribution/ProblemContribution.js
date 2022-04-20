import NavBar from '../../component/Navbar/Navbar';
import { setAuthHeader } from '../../helper/auth';
import { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from "material-table";

const ProblemContribution = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData(){
        var url = "http://localhost:8001/v1/problem/status";

        let result = await fetch(url, {
            method: 'GET',
            headers: setAuthHeader(),
        });
        
        result = await result.json();
        setProblems(result.Problems)
    }

    return (
        <div className='test d-flex flex-column min-vh-100'>
            <NavBar/>
            <div className="max-vw-100 adminMain">
            <div className="table-container">
                <MaterialTable
                    title={""}
                    columns = {[
                        {title: 'No', render:(rowData)=>rowData.tableData.id+1, width:'1%'},
                        {title: 'Nama Soal', field: 'title'},
                        {title: 'Kategori', field: 'topic'},
                        {title: 'Tingkat Kesulitan', field: 'difficulty'},
                        {title: 'Status', field:'status'},
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
                        marginTop: '5%',
                        marginLeft: '5%',
                        marginBottom: '8%',
                        marginRight: '-150px'
                    }}

                    data= {problems}

                    options = {{
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
        </div>
    </div>
    );
}


export default ProblemContribution;