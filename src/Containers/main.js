import React from 'react';
import DragAndDrop from '../Components/DragAndDrop.js';
import XLSX from 'xlsx';

class Main extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        text: "Перетащите сюда файл или нажмите чтобы выбрать",
        error: false,
        maxSize: 10000000,
    };
    componentDidMount(){
        let dropArea = document.getElementById('drop-area');
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.preventDefaults, false)
        });
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.highlight, false)
        });
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.unhighlight, false)
        });
        dropArea.addEventListener('drop', this.handleDrop, false);
    }

    preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    highlight = (e) => {
        e.target.classList.add('highlight')
    };
    unhighlight = (e) => {
        e.target.classList.remove('highlight')
    };


    handleDrop = (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;
        this.handleFiles(files[0]);
    };

    parse = (file) => {
        let saveData = this.props.saveData;
        if(this.state.error === true){
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, {type: 'array'});
            let dataArray = [];
            let maxLength = 0;
            workbook = workbook.Sheets;

            for(let sheet in workbook){
                let keys = Object.keys(workbook[sheet]);
                keys.shift();
                keys.pop();
                let array = [];
                keys.forEach(function (key) {
                    let secondSubSrting = key.match(/^[A-Za-z]+/)[0];
                    secondSubSrting = secondSubSrting.charCodeAt(0) - 65;
                    let firstSubString = key.match(/[0-9]+/)[0];
                    firstSubString--;
                    if(array[firstSubString] === undefined){
                        array[firstSubString] = [];
                    }
                    array[firstSubString][secondSubSrting] = workbook[sheet][key];
                    if(maxLength < secondSubSrting){
                        maxLength = secondSubSrting;
                    }

                });
                for(let i = 0; i < array.length; i++){
                    if(array[i] === undefined){
                        array[i] = [];
                    }
                    for(let j = 0; j <= maxLength; j++){
                        if(array[i][j] === undefined){
                            array[i][j] = [];
                        }
                    }
                }
                dataArray.push(array);
            }
            saveData(dataArray);
        };
        reader.readAsArrayBuffer(file);
    };

    handleFiles = (file) => {
        file = file.name === undefined ? file.target.files[0] : file;
        let error = this.checkfile(file);
        if(error != undefined){
            this.setState({text: error});
        }
        this.parse(file);
    };

    checkfile = (file) => {
        let validExts = new Array(".xlsx", ".xls");
        let fileName = file.name;
        let fileExt = fileName.substring(fileName.lastIndexOf('.'));
        if (validExts.indexOf(fileExt) < 0) {
            this.setState({error: true});
            return`Недопустимый тип файла ${fileExt} выберите другой файл`
        }
        else if(file.size > this.state.maxSize){
            this.setState({error: true});
            return "Допустимый размер файла 10Мб, выберите другой файл"
        }
        else {
            this.setState({error: false});
            return `Файл - ${fileName}`
        }
    };

    render() {
        return(
            <div>
                <DragAndDrop id={"text"} onChange={this.handleFiles} text={this.state.text} />
            </div>
        );
    }
}

export default Main;