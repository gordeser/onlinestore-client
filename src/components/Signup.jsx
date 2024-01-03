import React from "react";

const Signup = () => {
    return (
        <main className="d-flex justify-content-center">
            <form className="row g-2 w-50">
                <h1 className="mb-3 fw-normal text-center">Sign up</h1>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input required className="form-control" id="floatingInputGrid" placeholder="name" />
                            <label htmlFor="floatingInputGrid">Name</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input required className="form-control" id="floatingSelectGrid" placeholder="surname" />
                            <label htmlFor="floatingSelectGrid">Surname</label>
                        </div>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="form-floating">
                        <input required className="form-control" id="floatingAddress" placeholder="address" />
                        <label htmlFor="floatingAddress">Address</label>
                        <div id="addressHelp" className="form-text">Do not forget to include the street, house number, city, zip code and country</div>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input required type="email" className="form-control" id="floatingEmail" placeholder="example@example.com" />
                            <label htmlFor="floatingEmail">Email</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input required type="email" className="form-control" id="floatingConfirmEmail" placeholder="example@example.com" />
                            <label htmlFor="floatingConfirmEmail">Confirm Email</label>
                        </div>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input required type="password" className="form-control" id="floatingPassword" placeholder="password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input required type="password" className="form-control" id="floatingConfirmPassword" placeholder="confirmPassword" />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary py-2" type="submit">Sign up</button>
            </form>
        </main>
    )
}

export default Signup;
