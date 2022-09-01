import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
let isbnlist=[];
function getIsbn(userid) {
    let isbns = [];
    axios.get("http://localhost:8080/allIsbn").then(response => {
        if (response.data != null) {
            let arr = [...response.data];
            console.log(arr);
            let flag = 0;
            for (let i = 0; i < arr.length; i++) {
                let ele = arr[i];
                if (ele['userid'] == userid) {
                    flag = 1;
                    isbns.push(ele["isbn"]);
                }
            }
            if (flag == 0) {
                alert("no registered user")
            }
            else {
                isbnlist=[...isbns]
                console.log(isbnlist);
            }
        }
    }).catch(err => console.log(err))
}
function postIsbn(isbn, userid) {
    const userobj = {
        isbn: isbn,
        userid: userid,
    }
    //console.log(userobj)
    axios.post("http://localhost:8080/addIsbn", userobj).then(response => {
        alert(response)
    }).catch(err => console.log(err))
}
function delIsbn(isbn, userid) {

    let url = "http://localhost:8080/delIsbn/" + userid + "/" + isbn;
    axios.delete(url).then(response => {
        alert(response)
    }).catch(err => console.log(err))
}
function setuserid(email) {
    let flag = 0;
    axios.get("http://localhost:8080/users").then(response => {
        if (response.data != null) {
            let arr = [...response.data];
            //  console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                let ele = arr[i];
                if (ele['email'] == email) {
                    flag = 1;
                    //console.log(ele["id"])
                    localStorage.setItem("userid", ele["id"]);
                }
            }
            if (flag == 0) {
                console.log("Nothing found")
            }
        }
    }).catch(err => console.log(err))
}
function login() {
    var email =
        document.querySelector("#emailaddress").value;
    var password =
        document.querySelector('#password').value;
    // console.log(email)
    // setuserid("gaurangshah4@gmail.com");
    // console.log("user id is"+localStorage.getItem("userid"));
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

    // postIsbn("123444", 125)
    //delIsbn("123444", 125)
    getIsbn(124);
    if (email == "" || !regEmail.test(email)) {
        alert("Please enter a valid e-mail address.");
        return;
    }
    else if (password == "") {
        alert("Please enter your password");
        return;
    }
    else {
        const userobj = {
            email: email,
            password: password,
        }
        axios.get("http://localhost:8080/users").then(response => {
            if (response.data != null) {
                let arr = [...response.data];
                let flag = 0;
                let corr = 0;
                for (let i = 0; i < arr.length; i++) {
                    let ele = arr[i];
                    if (ele["email"] == email) {
                        flag = 1;
                        if (ele["password"] == password) {
                            corr = 1;
                        }
                        break
                    }
                }
                if (flag == 1 & corr == 1) {
                    flag = 0;
                    corr = 0;
                    setuserid(email);
                    alert("User Logged In");
                    window.location.href = "/";
                }
                else if (flag == 1 & corr == 0) {
                    flag=0;
                    alert("Wrong password entered");
                }
                else {
                    alert("No Registered Account Found")
                }
            }
            else {
                alert("No Registered Account Found")
            }
        }).catch(err => console.log(err))

    }
}
function register() {
    window.location.href = "/registerpage";
}
function Loginpage() {
    let rem = "";
    return (
        <div className="text-center mt-5">
            <form style={{ maxWidth: "350px", margin: "auto" }} name="Regform">
                <img style={{ height: "72px" }} className="mt-4 mb-4 "
                    src="https://cdn1.vectorstock.com/i/1000x1000/74/40/education-open-book-icon-vector-10187440.jpg" />
                <h3 className="mb-3 font-weight-normal">Please Sign in</h3>
                <div className="mb-3">
                    <input required autoFocus type="email" id="emailaddress" placeholder="Email Address" className="form-control"></input>
                </div>
                <div>
                    <input required autoFocus type="password" id="password" placeholder="Password" className="form-control"></input>
                </div>
                <div>
                    <input className="me-2 mt-4" type="checkbox" ></input>
                    <label style={{ textAlign: "center" }}>
                        Remember me
                    </label>
                </div>
                <div className="mt-3"><button type="reset" className="btn btn-lg btn-primary w-100" onClick={login}>Sign
                    In</button></div>
                <div className="mt-4"><button type="submit" className="btn btn-lg btn-primary w-100"
                    onClick={register}>Register</button></div>
            </form>
        </div>
    );
}
export default Loginpage;