import MCQ from '../../component/Assignment/MCQ';
import CheckBox from "../../component/Assignment/CheckBox";
import NavBar from "../../component/Navbar/Navbar";
import ShortAnswer from "../../component/Assignment/ShortAnswer";
import PriorityList from "../../component/Assignment/PriorityList";
import Timer from "../../component/Assignment/Timer";
import React from 'react';
import AssignmentService from "../../service/AssignmentService";
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Assignment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            problems: [],
            problemElement: [],
            answers: [],
            duration: 0,
            render: false,
            show: false,
            score: 0
        }
    }

    handleShow = () => this.setState({
        ['show']: true,
    });

    async componentDidMount() {
        const getQueryParam = new URLSearchParams(window.location.search);
        const id = getQueryParam.get("id");
        var result = await AssignmentService.getAssignmentProblems(id);
        result = await result.json();
        
        var time = new Date();
        time.setSeconds(time.getSeconds() + result.duration);

        this.setState({
            ['problems']: result.problems,
            ['time']: time,
        });

        this.state.problems.map((elem) => {
            var key = elem.id;

            var value;
            if (elem.type == "pilgan"){
                value = 0;
            } else if (elem.type == "checkbox"){
                value = [];
            } else if (elem.type == "isian"){
                value = "";
            } else if (elem.type == "plist"){
                value = Array(elem.choice.length).fill("");
            }

            this.setState({
                [key]: value,
            })
        })

        this.setState({
            ['render']: true,
        })
    }

    handleChange = (e) => {
        if (e.target.type === "checkbox"){
            var checkedIdx = this.state[e.target.name];
            
            if (e.target.checked){
                checkedIdx.push(parseInt(e.target.value))
            } else {
                var index = checkedIdx.indexOf(parseInt(e.target.value));
                if (index != -1){
                    checkedIdx.splice(index, 1);
                }
            }

            this.setState({
                [e.target.name]: checkedIdx,
            });
        }
        else if (e.target.tagName === "SELECT") {
            var priorityIdx = e.target.id;
            var ans = this.state[e.target.name];

            ans[priorityIdx] = e.target.value;

            this.setState({
                [e.target.name]: ans,
            });
        }
        else {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    handleSubmit = () => {
        var ans = this.state.problems;
        var indexes = this.state.problems.map(el => el.id);
        var values = indexes.map(el => this.state[el]);

        ans = ans.map(function(el, idx) {
            var answer = Array(el.choice.length).fill(0);

            if (el.type == "pilgan") {
                answer[values[idx]] = 1;
            }
            else if (el.type == "isian") {
                answer[0] = values[idx];
            }
            else if (el.type == "checkbox") {
                values[idx].forEach(el => answer[el] = 1);
            }
            else if (el.type == "plist") {
                answer = values[idx];
            }

            var detail = {
                id: el.id,
                type: el.type,
                answer: answer
            };

            return detail;
        });

        const getQueryParam = new URLSearchParams(window.location.search);
        const id = getQueryParam.get("id");

        const formValues = {
            id: id,
            answers: ans
        }

        this.submitAssignment(id, formValues).then(
            result => {
                this.setState({['score']: result.score})
                this.handleShow();
            }
        );
    }

    async submitAssignment(id, formValues) {
        var result = await AssignmentService.calculateAssignmentScore(id, formValues);
        result = await result.json();
        return result;
    }

    render(){

        return (
            <div>
                <NavBar />
                { this.state.render ? <Timer expiryTimestamp={this.state.time} timerExpired={this.handleSubmit}/> : null }
                <div className="assignment-questions">              
                    {this.state.problems.map((value, i) => {
                        var questionTitle = "Question " + (parseInt(i)+1);

                        if (value.type == "pilgan"){
                            return (<MCQ title={questionTitle} problem={value.question} name={value.id} handleChange={this.handleChange} choices={value.choice}/>);
                        } else if (value.type == "isian"){
                            return (<ShortAnswer title={questionTitle} problem={value.question} name={value.id} handleChange={this.handleChange} value={this.state[value.id]}/>);
                        } else if (value.type == "checkbox"){
                            return(<CheckBox title={questionTitle} problem={value.question} name={value.id} handleChange={this.handleChange} choices={value.choice}/>);
                        } else if (value.type == "plist") {
                            return(<PriorityList title={questionTitle} problem={value.question} name={value.id} handleChange={this.handleChange} choices={value.choice}/>);
                        }
                    })}
                </div>
                <div className="submissionButton row mx-5">
                    <div className='col-md-10'></div>
                    <button onClick={this.handleSubmit} className='col-md-2 col my-5 p-4'>
                        Submit
                    </button>
                </div>
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assignment sudah selesai dikerjakan!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Berikut nilai yang Anda peroleh: {this.state.score}</Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="q-btn btn btn-primary" ><Link to="/dashboard?page=1" className='text-decoration-none text-white'>Selesai</Link></button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Assignment