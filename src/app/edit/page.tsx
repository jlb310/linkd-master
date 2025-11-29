'use client'

import { getCardBySession, updateCard } from '../actions'
import { useEffect, useState, useRef } from 'react'
import { Upload } from 'lucide-react'

export default function EditPage() {
    const [card, setCard] = useState<any>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [gradient, setGradient] = useState('linear-gradient(180deg, #e0e0e0 0%, #a0a0a0 100%)')
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        async function loadCard() {
            const data = await getCardBySession()
            if (data) {
                setCard(data)
                if (data.photoBase64) setPhotoPreview(data.photoBase64)
                if (data.gradient) setGradient(data.gradient)
            }
        }
        loadCard()
    }, [])

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const img = new Image()
            img.onload = () => {
                // Crop to square
                const canvas = document.createElement('canvas')
                const size = Math.min(img.width, img.height)
                canvas.width = 400
                canvas.height = 400
                const ctx = canvas.getContext('2d')!

                const offsetX = (img.width - size) / 2
                const offsetY = (img.height - size) / 2

                ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, 400, 400)
                const base64 = canvas.toDataURL('image/jpeg', 0.9)
                setPhotoPreview(base64)
            }
            img.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
    }

    async function handleSubmit(formData: FormData) {
        formData.append('photoBase64', photoPreview || '')
        formData.append('gradient', gradient)
        await updateCard(formData)
        alert('Tarjeta actualizada')
    }

    if (!card) return <div className="container">Cargando...</div>

    return (
        <div className="container">
            <h1 style={{ marginBottom: 24 }}>Editar Tarjeta</h1>

            <form action={handleSubmit}>
                {/* Photo Upload */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            margin: '0 auto',
                            background: photoPreview ? `url(${photoPreview})` : '#333',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '4px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {!photoPreview && <Upload size={32} color="#666" />}
                    </div>
                    <p style={{ marginTop: 8, fontSize: 12, color: '#888' }}>Click para subir foto</p>
                </div>

                {/* Gradient Picker */}
                <label className="label">Fondo (Degradado)</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <button
                        type="button"
                        onClick={() => setGradient('linear-gradient(180deg, #e0e0e0 0%, #a0a0a0 100%)')}
                        style={{ width: 40, height: 40, borderRadius: 8, border: '2px solid #333', background: 'linear-gradient(180deg, #e0e0e0 0%, #a0a0a0 100%)', cursor: 'pointer' }}
                    />
                    <button
                        type="button"
                        onClick={() => setGradient('linear-gradient(180deg, #667eea 0%, #764ba2 100%)')}
                        style={{ width: 40, height: 40, borderRadius: 8, border: '2px solid #333', background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)', cursor: 'pointer' }}
                    />
                    <button
                        type="button"
                        onClick={() => setGradient('linear-gradient(180deg, #f093fb 0%, #f5576c 100%)')}
                        style={{ width: 40, height: 40, borderRadius: 8, border: '2px solid #333', background: 'linear-gradient(180deg, #f093fb 0%, #f5576c 100%)', cursor: 'pointer' }}
                    />
                    <button
                        type="button"
                        onClick={() => setGradient('linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)')}
                        style={{ width: 40, height: 40, borderRadius: 8, border: '2px solid #333', background: 'linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)', cursor: 'pointer' }}
                    />
                    <button
                        type="button"
                        onClick={() => setGradient('linear-gradient(180deg, #43e97b 0%, #38f9d7 100%)')}
                        style={{ width: 40, height: 40, borderRadius: 8, border: '2px solid #333', background: 'linear-gradient(180deg, #43e97b 0%, #38f9d7 100%)', cursor: 'pointer' }}
                    />
                </div>

                <label className="label">Nombre</label>
                <input type="text" name="name" className="input" defaultValue={card.name || ''} placeholder="Benjamin Garcia" />

                <label className="label">Cargo</label>
                <input type="text" name="title" className="input" defaultValue={card.title || ''} placeholder="DUEÑO" />

                <label className="label">Empresa</label>
                <input type="text" name="company" className="input" defaultValue={card.company || ''} placeholder="AltureX" />

                <label className="label">WhatsApp</label>
                <input type="tel" name="whatsapp" className="input" defaultValue={card.whatsapp || ''} placeholder="+56912345678" />

                <label className="label">Email</label>
                <input type="email" name="email" className="input" defaultValue={card.email || ''} placeholder="contacto@ejemplo.com" />

                <label className="label">Sitio Web</label>
                <input type="url" name="website" className="input" defaultValue={card.website || ''} placeholder="https://ejemplo.com" />

                <label className="label">Instagram</label>
                <input type="text" name="instagram" className="input" defaultValue={card.instagram || ''} placeholder="@usuario" />

                <label className="label">LinkedIn</label>
                <input type="url" name="linkedin" className="input" defaultValue={card.linkedin || ''} placeholder="https://linkedin.com/in/usuario" />

                <button type="submit" className="btn" style={{ marginTop: 24 }}>
                    Guardar Cambios
                </button>
            </form>
        </div>
    )
}
