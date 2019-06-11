import React from 'react';
import Main from "./main";
import Table from "../Components/table.js"

class Page extends React.Component{
    state = {
      conversion: []
    };
    saveData = (object) => {
        this.setState({conversion: object});
    };

    render(){
        return(
            <div>
              <Main saveData={this.saveData}/>
              <Table arrayPage={this.state.conversion}/>
            </div>
        );
    }
}

export default Page;