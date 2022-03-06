import { useState, useEffect } from 'react'
import { RepositoryItem } from "./RepositoryItem"

import '../styles/repositories.scss'
import { useUser } from './useUser'
import { useQuery } from 'react-query'
import { api } from '../services/api'

interface Repository {
    name: string
    description: string
    html_url: string
}




export function RepositoryList() {
    const { userName } = useUser()

    const {data, isFetching} = useQuery<Repository[]>('repos',async () => {
        const response = await api.get(`/${userName}/repos`);
        return response.data;
    },{
        staleTime: 1000*60 // 1 minute
    })
    

    

    return (
        <section className="repository-list">
            <h1>Repositories List</h1>
            {isFetching && <p>Loading...</p>}
            <ul>
                {data?.map(repository => {
                    return <RepositoryItem key={repository.name} repository={repository} />
                })}
            </ul>
        </section>
    )
}