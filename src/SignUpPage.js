import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
function login() {
    var names = document.querySelector("#name").value;
    var email =
        document.querySelector("#emailaddress").value;
    var password =
        document.querySelector('#password').value;
    var cpassword = document.querySelector('#passwordretype').value;
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    if (names == "") {
        alert("Name can't be left blank");
        return false;
    }
    else if (email == "" || !regEmail.test(email)) {
        alert("Please enter a valid e-mail address.");

        return false;
    }
    else if (password == "") {
        alert("Please enter your password");
        return;
    }
    else if (password.length < 6) {
        alert("Password should be atleast 6 character long");
        return;
    }

    else if (cpassword != password) {
        alert("Confirm Password and password are not the same");
        return;
    }
    else if (cpassword == "") {
        alert("Confirm password cannot be left empty");
        return;
    }
    else {
        const userobj = {
            name: names,
            email: email,
            password: password,
        }
        //console.log(userobj)
        axios.get("http://localhost:8080/users").then(response => {
            if (response.data != null) {
                let arr = [...response.data];
                let flag = 0;
                for (let i = 0; i < arr.length; i++) {
                    let ele = arr[i];
                    if (ele["email"] == email) {
                        flag = 1;
                        break
                    }
                }
                if (flag == 0) {
                    axios.post("http://localhost:8080/addUser", userobj).then(response => console.log(response))
                    alert("User registered");
                    window.location.href = "/";
                }
                else {
                    flag = 0;
                    alert("User already registered")
                }
            }
            else {
                axios.post("http://localhost:8080/addUser", userobj).then(response => console.log(response))
                alert("User registered");
                window.location.href = "/";
            }
        }).catch(err => console.log(err))

    }
}
function Registerpage() {
    return (
        <div className="text-center mt-5">
            <form style={{ maxWidth: "350px", margin: "auto" }} name="Regform">
                <img style={{ height: "72px" }} className="mt-4 mb-4 "
                    src="https://cdn1.vectorstock.com/i/1000x1000/74/40/education-open-book-icon-vector-10187440.jpg" />
                <h3 className="mb-3 font-weight-normal">Register Page</h3>
                <div className="mb-3">
                    <input required autoFocus type="text" id="name" placeholder="Name" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <input required autoFocus type="email" id="emailaddress" placeholder="Email Address" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <input required autoFocus type="password" id="password" placeholder="Password(Atleast 6 characters)" className="form-control"></input>
                </div>
                <div>
                    <input required autoFocus type="password" id="passwordretype" placeholder="Confirm Password" className="form-control"></input>
                </div>
                <div className="mt-5"><button type="reset" className="btn btn-lg btn-primary w-100" onClick={login}>Register</button></div>
            </form>
        </div>
    );
}
export default Registerpage;