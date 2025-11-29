import Link from 'next/link'

export default function Home() {
  return (
    <div className="container" style={{ justifyContent: 'center' }}>
      <div className="glass-card" style={{ textAlign: 'center', maxWidth: 400 }}>
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>Linkd</h1>
        <p style={{ marginBottom: 32, color: '#aaa' }}>
          Tarjetas de presentación digitales NFC
        </p>

        <Link href="/admin" className="btn" style={{ display: 'inline-flex', marginBottom: 12 }}>
          Admin Panel
        </Link>

        <Link href="/login" className="btn btn-outline" style={{ display: 'inline-flex' }}>
          Acceso Cliente
        </Link>
      </div>
    </div>
  )
}
