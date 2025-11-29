'use client'

import { login } from '../actions'
import { useState } from 'react'

export default function LoginPage() {
    const [error, setError] = useState('')

    async function handleSubmit(formData: FormData) {
        const result = await login(formData)
        if (result?.error) {
            setError(result.error)
        }
    }

    return (
        <div className="container" style={{ justifyContent: 'center' }}>
            <div className="glass-card" style={{ maxWidth: 400 }}>
                <h1 style={{ marginBottom: 24, textAlign: 'center' }}>Linkd</h1>
                <p style={{ marginBottom: 24, textAlign: 'center', color: '#aaa' }}>
                    Ingresa tu código de acceso
                </p>

                <form action={handleSubmit}>
                    <input
                        type="text"
                        name="code"
                        className="input"
                        placeholder="Ej: A7X"
                        maxLength={3}
                        style={{ textTransform: 'uppercase', textAlign: 'center', fontSize: 24, letterSpacing: 8 }}
                        required
                    />

                    {error && (
                        <p style={{ color: '#ff4444', marginBottom: 16, textAlign: 'center' }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}
