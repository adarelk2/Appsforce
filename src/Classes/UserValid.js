class UserValid
{
    constructor(_firstName, _lastName, _email)
    {
        this.errors = [];
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.email = _email;
    }

    valid()
    {
        this.emailIsValid();
        this.firstNameIsValid();
        this.lastNameIsValid();

        return this.errors
    }

    emailIsValid()
    {
        let state = (this.email.indexOf("@") > -1 && this.email.indexOf(".",this.email.indexOf("@")) > -1 && this.email.length > 6) ? true : false;
        if(!state)
        {
            this.errors.push("Email is not Valid");
        }
    }

    firstNameIsValid()
    {
       let state = (this.firstName.length > 2) ? true : false;

       if(!state)
       {
           this.errors.push("firstName is not Valid");
       }
    }

    lastNameIsValid()
    {
        let state = (this.lastName.length > 2) ? true : false;

        if(!state)
        {
            this.errors.push("lastName is not Valid");
        }
    }
}

export default UserValid;