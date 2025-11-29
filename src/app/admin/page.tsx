'use client'

import { createCard } from '../actions'
import { useState } from 'react'

export default function AdminPage() {
    const [newCard, setNewCard] = useState<{ accessCode: string, slug: string } | null>(null)

    async function handleCreate() {
        const card = await createCard()
        setNewCard(card)
    }

    return (
        <div className="container">
            <h1 style={{ marginBottom: 20 }}>Linkd Admin</h1>
            <button className="btn" onClick={handleCreate}>
                Crear Nueva Tarjeta
            </button>

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
