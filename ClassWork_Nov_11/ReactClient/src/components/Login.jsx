import { useState } from 'react'
export default function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const AUTH_URL = import.meta.env.VITE_AUTH_URL
    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        try {
            const res = await fetch(`${AUTH_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password })
            })
            if (!res.ok) {
                const data = await res.json()
                return setError(data.error || 'Login failed')
            }
            const data = await res.json()
// NOTE: just log it for now — we store it next
            console.log('token:', data.accessToken)
        } catch (err) {
            setError('Cannot reach the server')
        }
    }
    return (
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input className="form-control" value={userName}
                           onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password}
                           onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Log In
                </button>
            </form>
        </div>
    )
}