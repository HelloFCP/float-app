'use server'

import admin from '@/lib/firebase-admin'
import { getSession } from './auth'
import { canManageLeads, canSubmitLead } from '@/lib/rbac'

export async function submitLead(formData: FormData) {
  const session = await getSession()
  if (!session || !canSubmitLead(session.role)) {
    return { error: 'Unauthorized' }
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const aircraftType = formData.get('aircraftType') as string
  const loanAmount = parseFloat(formData.get('loanAmount') as string)

  try {
    const leadRef = await admin.firestore().collection('leads').add({
      name,
      email,
      phone,
      aircraftType,
      loanAmount,
      status: 'NEW',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      userId: session.id
    })

    return { success: true, leadId: leadRef.id }
  } catch (error: any) {
    console.error('Failed to submit lead:', error)
    return { error: 'Failed to submit lead' }
  }
}

export async function getLeads() {
  const session = await getSession()
  if (!session || !canManageLeads(session.role)) {
    return { error: 'Unauthorized' }
  }

  try {
    const leadsSnapshot = await admin.firestore().collection('leads').orderBy('createdAt', 'desc').get()
    const leads = leadsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return { leads }
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    return { error: 'Failed to fetch leads' }
  }
}

export async function updateLeadStatus(leadId: string, status: string) {
  const session = await getSession()
  if (!session || !canManageLeads(session.role)) {
    return { error: 'Unauthorized' }
  }

  try {
    await admin.firestore().collection('leads').doc(leadId).update({ status })
    return { success: true }
  } catch (error) {
    console.error('Failed to update lead status:', error)
    return { error: 'Failed to update lead status' }
  }
}

