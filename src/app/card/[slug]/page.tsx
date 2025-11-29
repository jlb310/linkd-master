'use client'

import { getCard } from '../../actions'
import { useEffect, useState } from 'react'
import { MessageCircle, Mail, Globe, Instagram, Linkedin, Download } from 'lucide-react'

export default function CardPage({ params }: { params: { slug: string } }) {
    const [card, setCard] = useState<any>(null)

    useEffect(() => {
        async function loadCard() {
            const data = await getCard(params.slug)
            setCard(data)
        }
        loadCard()
    }, [params.slug])

    function generateVCF() {
        if (!card) return

        const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${card.name || ''}
TITLE:${card.title || ''}
ORG:${card.company || ''}
TEL;TYPE=CELL:${card.whatsapp || ''}
EMAIL:${card.email || ''}
URL:${card.website || ''}
NOTE:Instagram: ${card.instagram || ''} | LinkedIn: ${card.linkedin || ''}
END:VCARD`

        const blob = new Blob([vcf], { type: 'text/vcard' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${card.name || 'contacto'}.vcf`
        a.click()
        URL.revokeObjectURL(url)
    }

    if (!card) {
        return (
            <div className="container" style={{ justifyContent: 'center' }}>
                <p>Cargando...</p>
            </div>
        )
    }

    return (
        <div
            className="container"
            style={{
                background: card.gradient || 'linear-gradient(180deg, #e0e0e0 0%, #a0a0a0 100%)',
                minHeight: '100vh',
                justifyContent: 'center',
                padding: '40px 20px'
            }}
        >
            {/* Logo/Photo */}
            {card.photoBase64 && (
                <img
                    src={card.photoBase64}
                    alt={card.name}
                    className="avatar"
                    style={{ width: 160, height: 160 }}
                />
            )}

            {/* Name */}
            {card.name && (
                <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4, textAlign: 'center', color: '#000' }}>
                    {card.name}
                </h1>
            )}

            {/* Title */}
            {card.title && (
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, textAlign: 'center', color: '#333', letterSpacing: 1 }}>
                    {card.title}
                </p>
            )}

            {/* Company */}
            {card.company && (
                <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 32, textAlign: 'center', color: '#000' }}>
                    {card.company}
                </p>
            )}

            {/* Action Buttons */}
            <div style={{ width: '100%', maxWidth: 400 }}>
                {card.whatsapp && (
                    <a
                        href={`https://wa.me/${card.whatsapp.replace(/[^0-9]/g, '')}`}
                        className="btn"
                        style={{ background: 'white', color: '#000' }}
                    >
                        <MessageCircle size={20} />
                        WhatsApp
                    </a>
                )}

                {card.email && (
                    <a
                        href={`mailto:${card.email}`}
                        className="btn"
                        style={{ background: 'white', color: '#000' }}
                    >
                        <Mail size={20} />
                        Email
                    </a>
                )}

                {card.website && (
                    <a
                        href={card.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ background: 'white', color: '#000' }}
                    >
                        <Globe size={20} />
                        Sitio web
                    </a>
                )}

                {card.instagram && (
                    <a
                        href={`https://instagram.com/${card.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ background: 'white', color: '#000' }}
                    >
                        <Instagram size={20} />
                        Instagram
                    </a>
                )}

                {card.linkedin && (
                    <a
                        href={card.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ background: 'white', color: '#000' }}
                    >
                        <Linkedin size={20} />
                        LinkedIn
                    </a>
                )}

                {/* Save Contact Button */}
                <button
                    onClick={generateVCF}
                    className="btn"
                    style={{ background: '#000', color: '#fff', marginTop: 16 }}
                >
                    <Download size={20} />
                    Guardar Contacto
                </button>
            </div>
        </div>
    )
}
