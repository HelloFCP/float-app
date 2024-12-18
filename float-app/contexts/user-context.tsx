'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { UserData } from '@/app/actions/auth'

type UserContextType = {
  user: UserData | null
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData
          userData.id = firebaseUser.uid
          setUser(userData)
        }
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

