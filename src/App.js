import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import UsersTable from './Component/UsersTable';
import User from './Component/User';
class App extends React.Component 
{
  constructor(_props)
  {
      super();
        
      this.state = {Component:_props.Component,rows:[],userSelected:false};
  }
  
  render() 
  {
    switch(this.state.Component)
    {
      case "UsersTable":
        return (<UsersTable app={this}/>);
      break;
      
      case "editUser":
        return (<User app={this} command="edit"/>);
        break;

        case "createUser":
        return (<User app={this} command="add"/>);
        break;
    }
  }

}

export default App;