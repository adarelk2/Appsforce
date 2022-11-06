import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import UserValid from '../Classes/UserValid'
class User extends React.Component {
    constructor(_props)
    {
        super();
        this.parent = _props;
        this.command = _props.command;
        this.state = {firstName:"", lastName:"",email:""};

    }
    componentDidMount()
    {
      if(this.command == "edit")
      {
        let userSelected = this.parent.app.state.userSelected;

        this.setState({email:userSelected.email, firstName:userSelected.name.first, lastName:userSelected.name.last})
      }
    }

  render() {
    return (<div className='col-6 mx-auto form-group mt-3'>
              <label>E-mail: </label>
              <input type='text' className='form-control' value={this.state.email}  onChange={(e)=>{
                this.setState({email:e.target.value});
              }}/>
              <label>firstName: </label>
              <input type='text' className='form-control' value={this.state.firstName}  onChange={(e)=>{
                this.setState({firstName:e.target.value});
              }}/>
              <label>lastName: </label>
              <input type='text' className='form-control' value={this.state.lastName}  onChange={(e)=>{
                this.setState({lastName:e.target.value});
              }}/>

              <button className='btn btn-primary mt-4' onClick={()=>{
                this.save();
              }}>Save</button>

              <button className='btn btn-danger mt-4 mx-4' onClick={()=>{
                this.cancle();
              }}>Cancle</button>
    </div>);
  }

  cancle()
  {
    this.parent.app.setState({Component:"UsersTable",userSelected:false});
  }

  save()
  {
    let user = new UserValid(this.state.firstName, this.state.lastName, this.state.email);
    user.valid();

    if(user.errors.length)
    {
      alert(user.errors.join("\n"));
    }
    else
    {
      switch(this.command)
      {
        case "edit":
          let findUser = this.parent.app.state.rows.findIndex(user=>{return user.login.uuid == this.parent.app.state.userSelected.login.uuid});
          
          if(findUser > -1)
          {
            let userSelected = this.parent.app.state.userSelected;

            userSelected.email = this.state.email;
            userSelected.name.last = this.state.lastName;
            userSelected.name.first = this.state.firstName;

            let rows = this.parent.app.state.rows;

            rows[findUser] = userSelected;

            this.parent.app.setState({rows})

            this.parent.app.setState({userSelected:false})

            this.parent.app.setState({Component:"UsersTable"})
          }
          break;

        case "add":
          
          let rows = this.parent.app.state.rows;
          rows.push({login:{uuid:Date.now()},name:{first:this.state.firstName, last:this.state.lastName}, email:this.state.email, location:{country:"Israel", city:"Afula"}});
          this.parent.app.setState({rows})
          this.parent.app.setState({Component:"UsersTable"})
          break;
      }
    }

  }

}

export default User;