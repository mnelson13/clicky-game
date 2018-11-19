import React from 'react';
import './EmployeeCard.css';

const EmployeeCard = props => (
    <div className="card z-depth-5">
        <div className={"card-image " + (props.lose ? 'shake': '')}>
            <img onClick={() => props.clickHandler(props.id)} alt={props.name} src={props.image} />
        </div>
    </div>
);

export default EmployeeCard;