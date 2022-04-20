
import { useState, useEffect, useContext} from "react";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import Dropdown from "react-bootstrap/esm/Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown , faAngleUp, faBook, faBookOpen, faCirclePlay, faFile} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../../helper/isLoginContext";

const CourseSyllabus = (props) => {
    let [syllabus, setSyllabus] = useState([{"sectionName": "test", "subSections": [{"materialName": "asd", "materialType": "video"}, {"materialName": "efg", "materialType": "file"}]}, 
                                            {"sectionName": "tast", "subSections":  [{"materialName": "asd", "materialType": "video"}, {"materialName": "efg", "materialType": "file"}]}])
    let user = JSON.parse(localStorage.getItem('user-info'))
    let token = 0
    if (user != null){
        token = user.token
    }
    let authtoken = "Bearer " + token
    let id= props.id
    const navigate = useNavigate()
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)
    
    useEffect(() =>{
        let mounted = true
        if (!isLoggedIn){
            navigate("/sign-in")
            console.warn("harus login terlebih dahulu")
        }
        const fetchSyllabus = async () => {
            let result = await fetch("http://localhost:8001/v1/course/syllabus/"+ id, {
                method: 'GET',
                headers: {
                    "Authorization": authtoken,
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                    }
                }
            )
            result = await result.json()
            return result
        }
        
        fetchSyllabus().then(res=>{
            if (mounted){
                setSyllabus(res.Syllabus)
            }
        })
        return function cleanup(){
            mounted = false;
        }}, []
    )
    console.log(syllabus)
    //setSyllabus(fetchSyllabus())
    
    function showHidden(x){
        let elem = document.getElementById(x);
        console.log(elem)
        elem.classList.toggle("SHOW")
        let iconID = "icon" + x;
        let dropdownIcon = document.getElementById(iconID)
        dropdownIcon.classList.toggle("ROTATE")
    }
    
    return(
        <div className="syllabus">
            <div>
                <h3 className="py-4">Silabus</h3>
            </div>
            <div className="syllabus-data">
            {syllabus.map( (data, index) => (
                <div key = {index} className="container-dropdown">
                    <div className="button-container">
                        <button className="w-100 rounded" id = {"button"+index} onClick={() => showHidden(index)}>
                            <div>
                                <h4>{"Bagian  " + (index + 1) + " "+ data.sectionName}</h4>
                                <p>estimasi waktu: {}</p>
                            </div>
                            <div>
                                <FontAwesomeIcon className="fa-2x dropdown-icon" id={"icon"+index} icon={faAngleDown} />
                            </div>
                            
                        </button>
                    </div>
                    
                    <div id = {index} className="dropdown-content">
                        {data.subSections?.map((subData, idx) =>(
                            <Link to={"/course-material?sid=" + data.sectionID + "&mid=" + subData.materialID} state={{cid: id}}>
                                <button key={idx} className="w-100">
                                    <div className="material-type-icon">
                                        <FontAwesomeIcon className="fa-lg" id = {subData.materialID} icon={(subData.materialType=="video")? faCirclePlay : ((subData.materialType=="text")? faBookOpen : faFile)}/>
                                    </div>
                                    <div>
                                        <h5>{subData.materialName}</h5>
                                        <p>{subData.materialType}</p>
                                    </div> 
                                </button>
                            </Link>
                            
                            ))}
                    
                    </div>
                    
                    {/* <Dropdown className="dropdown-big">
                        <DropdownToggle className = "syllabus-sectionName" variant="secondary">
                            <div>
                                <h4>{"Bagian  " + (index + 1) + " "+ data.sectionName}</h4>
                                <p>estimasi waktu: {}</p>
                            </div>
                            
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu">
                            <div className="item">
                                {   
                                    data.subSections?.map(subData =>(
                                    <DropdownItem className="dropdown-item">
                                        <h5>{subData.materialName}</h5>
                                        <p>{subData.materialType}</p>
                                    </DropdownItem>
                                    
                                    ))}
                            </div>
                            
                        </DropdownMenu>
                    </Dropdown> */}
                </div>
                    
            ))}

            </div >
        </div>
    )
}
export default CourseSyllabus;