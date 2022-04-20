import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../helper/isLoginContext";
import NavBar from "../../component/Navbar/Navbar";
import Text from '../../component/CourseMaterial/Text';
import Video from '../../component/CourseMaterial/Video';
import Assignment from '../../component/CourseMaterial/Assignment';


const MaterialList = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let detail = location.state.detail;

    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
    }, [isLoggedIn])

    return (
        <Fragment>
            <NavBar/>
            <div className='row px-3 m-5'>
                <div className='col'>
                    <button className='actionButton f-btn btn btn-primary px-3 mx-5 border-0' onClick={() => navigate(-1)}>Kembali</button>
                </div>
            </div>
            <div className='row course-material px-5 m-5'>
                <div className="col m-3">
                    {detail.materialType == "text" &&
                        <Text state={detail} />
                    }
                    {detail.materialType == "video" &&
                        <Video state={detail} />
                    }
                    {detail.materialType == "assignment" &&
                        <Assignment state={detail}/>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default MaterialList;