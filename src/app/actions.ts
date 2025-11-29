'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function generateAccessCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed confusing chars like I, 1, O, 0
    let result = ''
    for (let i = 0; i < 3; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

export async function createCard() {
    let accessCode = generateAccessCode()

    // Ensure uniqueness (simple retry)
    while (await prisma.card.findUnique({ where: { accessCode } })) {
        accessCode = generateAccessCode()
    }

    const card = await prisma.card.create({
        data: {
            accessCode,
            slug: accessCode, // Default slug is the access code
            gradient: 'linear-gradient(180deg, #e0e0e0 0%, #a0a0a0 100%)'
        }
    })

    return card
}

export async function login(formData: FormData) {
    const code = formData.get('code') as string

    if (!code) return { error: 'Code required' }

    const card = await prisma.card.findUnique({
        where: { accessCode: code.toUpperCase() }
    })

    if (!card) {
        return { error: 'Invalid code' }
    }

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('card_access_code', card.accessCode, { httpOnly: true, path: '/' })

    redirect('/edit')
}

export async function updateCard(formData: FormData) {
    const cookieStore = await cookies()
    const accessCode = cookieStore.get('card_access_code')?.value

    if (!accessCode) {
        return { error: 'Unauthorized' }
    }

    const name = formData.get('name') as string
    const title = formData.get('title') as string
    const company = formData.get('company') as string
    const whatsapp = formData.get('whatsapp') as string
    const email = formData.get('email') as string
    const website = formData.get('website') as string
    const instagram = formData.get('instagram') as string
    const linkedin = formData.get('linkedin') as string
    const photoBase64 = formData.get('photoBase64') as string
    const gradient = formData.get('gradient') as string

    await prisma.card.update({
        where: { accessCode },
        data: {
            name, title, company, whatsapp, email, website, instagram, linkedin, photoBase64, gradient
        }
    })

    return { success: true }
}

export async function getCard(slug: string) {
    return await prisma.card.findUnique({
        where: { slug }
    })
}

export async function getCardBySession() {
    const cookieStore = await cookies()
    const accessCode = cookieStore.get('card_access_code')?.value

    if (!accessCode) return null

    return await prisma.card.findUnique({
        where: { accessCode }
    })
}
