import React from 'react';
import './table.css';

const Table = (props) => {
    return(
        <div id="tableBlock">
                {props.arrayPage.map(function (sheet, key) {
                    return <table key={key}>{sheet.map(function (arrayRow, key1) {
                        return <tbody key={key1 + 1}><tr key={key1}>{arrayRow.map(function (elem, key2) {
                            return <td key={key2}>{elem.v}</td>
                        })}</tr></tbody>
                    })}</table>
                })}
        </div>
    )
};

export default Table;