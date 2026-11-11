// src/components/useFetch.jsx
import { useState, useEffect } from 'react'

function useFetch(url) {

    const [data,      setData]      = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error,     setError]     = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url)
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
