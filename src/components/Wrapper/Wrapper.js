import React from 'react';
import './Wrapper.css';
import employeesList from '../../employees.json';
import EmployeeCard from '../EmployeeCard';
import banner from '../../Images/banner.webp';

class Wrapper extends React.Component {
    state = {
        employees: employeesList,
        chosenEmployees: [],
        score: 0,
        topScore: 0,
        text: "Click an image to begin!",
        lose: false
    }

    //shuffles images on page
    shuffle = (o) => {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            this.setState({ employees: o});
        
    }

    //resets scores and the chosenEmployees array
    reset = () => {
        if (this.state.score > this.state.topScore) {
            this.setState({topScore: this.state.score})
        }
        this.setState({chosenEmployees: []})
        this.setState({score: 0})
    }

    //checks if scores is greater than or equal to 12, updates text and restarts if true, 
    //runs shuffle function and sets text/chosenEmployees array if false
    winCheck = (id) => {
        if(this.state.score >= 12) {
            this.setState({
                text: "You got them all!"
            }, () => {
                this.reset();
            })
        } else {
            this.shuffle(this.state.employees)
            this.setState({text: "You guessed correctly!"})
            this.setState({chosenEmployees: [...this.state.chosenEmployees, id]})
        }
    }

    //on image click, checks if selected employee is already in the employee array,
    //updates score if not in array and runs winCheck function,
    //updates text and runs reset function if in array
    clickHandler = id => {
        if(this.state.chosenEmployees.indexOf(id) === -1 && this.state.score <12){
            this.setState({
                lose: false,
                score: this.state.score +1
            }, () => {
                this.winCheck(id);
            });
        } else if(this.state.chosenEmployees.indexOf(id) !== -1){
            this.setState({
                text: "You guessed incorrectly!",
                lose: true
            }, () => {
                this.reset();
            })
        }
    }

    //renders page
    render(){
        return(
            <div>

                <div className="navbar-fixed">
                    <nav className="z-depth-5 orange lighten-1">
                        <div className="nav-wrapper">
                        <h5 className="brand-logo center navText">{this.state.text}</h5>
                        <ul className="left hide-on-med-and-down">
                            <li><h5 className="navText">Clicky Game!</h5></li>
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            <li><h5 className="navText">Score: {this.state.score} | Top Score: {this.state.topScore}</h5></li>
                        </ul>
                        </div>
                    </nav>
                </div>

                <div className="imgDiv">
                    <img alt="banner" src={banner}></img>
                    <h5>Click on an image to earn points,<br></br> but don't click on any more than once!</h5>
                </div>

                <div className="wrapper container">
                    {
                        this.state.employees.map(
                            employee => <EmployeeCard
                            key={employee.id}
                            id={employee.id}
                            name={employee.name}
                            image={employee.image}
                            clickHandler={this.clickHandler}
                            lose ={this.state.lose}
                            />
                        )
                    }
                </div>
                
                <footer className="page-footer orange lighten-1">
                    <div className="footer-copyright orange lighten-1">
                        <div>
                        <h5 className="footerText">Clicky Game!</h5>
                        </div>
                    </div>
                </footer>

            </div>
        )
    }
}

export default Wrapper;