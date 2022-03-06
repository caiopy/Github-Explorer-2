import { useState, useEffect } from 'react'
import { RepositoryItem } from "./RepositoryItem"

import '../styles/profile.scss'
import { useUser } from './useUser'

interface Repository {
  name: string
  description: string
  html_url: string
}

interface User {
  login: string;
  name: string;
  bio: string;
  location: string;
  url: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
}



export function Profile() {
  const { user, userName } = useUser()

  return (
    <section className="profileContainer">

      <img src={user.avatar_url} alt="vatar" />
      <h3>{userName}</h3>
      {user.bio? <span>{user.bio}</span> : <span></span>}
    </section>
  )
}