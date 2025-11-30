'use client'

import { createCard } from '../actions'
import { useState } from 'react'

export default function AdminPage() {
    const [newCard, setNewCard] = useState<{ accessCode: string, slug: string } | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleCreate() {
        try {
            setLoading(true)
            setError(null)
            const card = await createCard()
            setNewCard(card)
        } catch (err) {
            console.error('Error creating card:', err)
            setError(err instanceof Error ? err.message : 'Error al crear tarjeta')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <h1 style={{ marginBottom: 20 }}>Linkd Admin</h1>
            <button className="btn" onClick={handleCreate} disabled={loading}>
                {loading ? 'Creando...' : 'Crear Nueva Tarjeta'}
            </button>

            {error && (
                <div className="glass-card" style={{ marginTop: 20, background: 'rgba(255,0,0,0.1)' }}>
                    <p style={{ color: '#ff4444' }}>Error: {error}</p>
                </div>
            )}

            {newCard && (
                <div className="glass-card" style={{ marginTop: 20 }}>
                    <h2>Tarjeta Creada</h2>
                    <p>Código de Acceso: <strong>{newCard.accessCode}</strong></p>
                    <p>URL Pública: /card/{newCard.slug}</p>
                </div>
            )}
        </div>
    )
}
