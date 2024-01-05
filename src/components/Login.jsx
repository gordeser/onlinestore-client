import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({onLogin}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            })

            if (response.ok) {
                document.cookie = `email=${email}; path=/;`;
                alert("Login successful");
                navigate('/');
                onLogin();
            } else {
                alert("Login failed");
            }

        } catch (error) {
            console.error("Error during login", error);
        }
    }

    return (
        <main className="d-flex justify-content-center">
            <form className="w-25" onSubmit={handleLogin}>
                <h1 className="mb-3 fw-normal">Sign in</h1>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email}
                           onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            </form>
        </main>
    )
}

export default Login;
