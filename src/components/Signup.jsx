import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const Signup = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setIsEmailValid(email === confirmEmail);
    }, [email, confirmEmail])

    useEffect(() => {
        setIsPasswordValid(password === confirmPassword);
    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEmailValid && isPasswordValid) {
            try {
                const response = await fetch("http://localhost:8080/api/signup", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name, surname, address, email, password}),
                })

                if (response.ok) {
                    document.cookie = `email=${email}; path=/;`
                    alert("Signed up successfully");
                    navigate('/');
                    onSignup();
                } else {
                    alert("User with this email is already registered");
                }

            } catch (error) {
                console.error("Error during register", error);
            }
        }
    }


    return (
        <main className="d-flex justify-content-center">
            <form className="row g-2 w-50" onSubmit={handleSubmit}>
                <h1 className="mb-3 fw-normal text-center">Sign up</h1>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input required className="form-control" id="floatingInputGrid" placeholder="name"
                                   onChange={(e) => setName(e.target.value)}/>
                            <label htmlFor="floatingInputGrid">Name</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input required className="form-control" id="floatingSelectGrid" placeholder="surname"
                                   onChange={(e) => setSurname(e.target.value)} />
                            <label htmlFor="floatingSelectGrid">Surname</label>
                        </div>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="form-floating">
                        <input required className="form-control" id="floatingAddress" placeholder="address"
                               onChange={(e) => setAddress(e.target.value)} />
                        <label htmlFor="floatingAddress">Address</label>
                        <div id="addressHelp" className="form-text">Do not forget to include the street, house number, city, zip code and country</div>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input required type="email" className="form-control" id="floatingEmail" placeholder="example@example.com"
                                   onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="floatingEmail">Email</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input required type="email" className={`form-control ${!isEmailValid ? 'is-invalid' : ''}`} id="floatingConfirmEmail" placeholder="example@example.com"
                                   onChange={(e) => setConfirmEmail(e.target.value)} />
                            <label htmlFor="floatingConfirmEmail">Confirm Email</label>
                            {!isEmailValid && <div className="invalid-feedback">Emails does not match</div>}
                        </div>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input required type="password" className="form-control" id="floatingPassword" placeholder="password"
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input required type="password" className={`form-control ${!isPasswordValid ? 'is-invalid' : ''}`} id="floatingConfirmPassword" placeholder="confirmPassword"
                                   onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                            {!isPasswordValid && <div className="invalid-feedback">Passwords does not match</div>}
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary py-2" type="submit">Sign up</button>
            </form>
        </main>
    )
}

export default Signup;
