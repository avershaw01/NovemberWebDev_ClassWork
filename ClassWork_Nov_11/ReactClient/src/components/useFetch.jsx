import { useState, useEffect } from 'react'
function useFetch(url) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
// NOTE: read the token and attach it if we have one
                const token = localStorage.getItem('accessToken')
                const headers = { 'Content-Type': 'application/json' }
                if (token) headers['Authorization'] = `Bearer ${token}`
                const res = await fetch(url, { headers })
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
                const json = await res.json()
                setData(json)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsPending(false)
            }
        }
        fetchData()
    }, [url])
    return { data, isPending, error }
}
export default useFetch