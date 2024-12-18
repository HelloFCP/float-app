'use server'

import admin from '@/lib/firebase-admin'
import { getSession, UserData } from './auth'

export async function getUsers(): Promise<UserData[]> {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  const usersSnapshot = await admin.firestore().collection('users').get()
  return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserData))
}

export async function updateUserRole(userId: string, newRole: 'user' | 'admin') {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  await admin.firestore().collection('users').doc(userId).update({ role: newRole })
}

