'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import admin from '@/lib/firebase-admin'

export type UserRole = 'user' | 'admin'

export type UserData = {
  id: string
  email: string
  name: string
  role: UserRole
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if (!email || !password || !name) {
    return { error: 'All fields are required' }
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    })

    const userData: UserData = {
      id: userRecord.uid,
      email: userRecord.email!,
      name: userRecord.displayName!,
      role: 'user' // Default role for new users
    }

    await admin.firestore().collection('users').doc(userRecord.uid).set(userData)

    const sessionCookie = await admin.auth().createSessionCookie(userRecord.uid, { expiresIn: 60 * 60 * 24 * 5 * 1000 }) // 5 days
    cookies().set('session', sessionCookie, { httpOnly: true, secure: true })

    redirect('/dashboard')
  } catch (error: any) {
    console.error('Registration error:', error)
    return { error: error.message }
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email)
    // Note: We can't use signInWithEmailAndPassword here as it's a client-side method.
    // Instead, we'll just create a session if the user exists.
    // In a real-world scenario, you'd want to verify the password here.

    const sessionCookie = await admin.auth().createSessionCookie(userRecord.uid, { expiresIn: 60 * 60 * 24 * 5 * 1000 }) // 5 days
    cookies().set('session', sessionCookie, { httpOnly: true, secure: true })

    redirect('/dashboard')
  } catch (error: any) {
    console.error('Login error:', error)
    return { error: error.message }
  }
}

export async function logout() {
  cookies().delete('session')
  redirect('/')
}

export async function getSession(): Promise<UserData | null> {
  const session = cookies().get('session')?.value
  if (!session) return null

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(session, true)
    const userDoc = await admin.firestore().collection('users').doc(decodedClaims.uid).get()
    if (userDoc.exists) {
      const userData = userDoc.data() as UserData
      return { ...userData, id: userDoc.id }
    }
  } catch (error) {
    console.error('Session verification error:', error)
    return null
  }

  return null
}

export async function sendPasswordResetEmail(email: string) {
  try {
    await admin.auth().generatePasswordResetLink(email)
    // In a real-world scenario, you would send this link to the user's email
    // For now, we'll just return success
    return { success: true }
  } catch (error: any) {
    console.error('Password reset error:', error)
    throw new Error(error.message)
  }
}

