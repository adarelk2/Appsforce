import React from 'react';
import Swal from 'sweetalert2'
import "bootstrap/dist/css/bootstrap.min.css";
class UsersTable extends React.Component {
    constructor(_props)
    {
        super();

        this.parent = _props;
        if(!this.parent.app.state.rows.length)
        {
            fetch("https://randomuser.me/api/?results=10").then(res=>res.json()).then(data=>{
                  this.parent.app.setState({rows:data.results});
            })
        }


    }
  render() {
    return (<div className='col-10 mx-auto'>
              <button className='btn btn-primary mt-3' onClick={()=>{
                this.createNewUser()
              }}>New User</button>
              <table className="table mt-5">
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {this.addToTable()}
                </tbody>
              </table>
            </div>);
  }

  addToTable()
  {
    return this.parent.app.state.rows.map((user, index)=>(
        <tr key={index} className="text-danger">
          <td>{user.gender}</td>
          <td>{user.name.title} {user.name.first} {user.name.last}</td>
          <td>{user.email}</td>
          <td>{user.location.country}</td>
          <td>{user.location.city}</td>
          <td>
              <button className='btn btn-primary' onClick={()=>{
              this.editUserBTN(user);
            }}>Edit</button>
          </td>
          <td>
              <button className='btn btn-danger' onClick={()=>{
              this.deleteUser(user);
            }}>Delete</button>
          </td>
        </tr>
    ))
  }

  editUserBTN(_user)
  {
    this.parent.app.setState({Component:"editUser",userSelected:_user});
  }

  deleteUser(_user)
  {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if(result.isConfirmed)
        {
          let findUser = this.parent.app.state.rows.findIndex(user=>{return user.login.uuid == _user.login.uuid});
          
          let rows = this.parent.app.state.rows;

          rows.splice(findUser,1);

          this.parent.app.setState({rows});
        }
      })
  }

  createNewUser()
  {
    this.parent.app.setState({Component:"createUser"});
  }
}

export default UsersTable;