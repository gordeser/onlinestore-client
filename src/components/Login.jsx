import React from "react";

const Login = ({onLogin}) => {
    return (
        <main className="d-flex justify-content-center">
            <form className="w-25">
                <h1 className="mb-3 fw-normal">Sign in</h1>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            </form>
        </main>
    )
}

export default Login;
