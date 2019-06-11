import React from 'react';
import './DragAndDrop.css';

const DragAndDrop = (props) => {
    return (
        <div id="drop-area">
            <input type="file" id="fileElem" onChange={props.onChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                <label id={props.id} htmlFor="fileElem">{props.text}</label>
        </div>
    );
};

export default DragAndDrop;