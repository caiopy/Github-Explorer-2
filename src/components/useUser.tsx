import { useContext } from 'react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';



interface User {
  login: string;
  name: string;
  bio: string;
  url: string;
  avatar_url: string;
  html_url: string;

}


interface UserProviderProps {
  children: ReactNode
}
interface UserContextData {
  user: User;
  handleSearchUser: (value: string) => void;
  isFetching: boolean;
  userName: string;
  error: Error | null;
  
}

const UserContext = createContext<UserContextData>(
  {} as UserContextData
)

export function UserProvider({ children }: UserProviderProps) {

  const [user, setUser] = useState<User>({} as User);
  const [userName, setUserName] = useState('caiopy');
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  function handleSearchUser(value: string) {
    setUserName(value)
  }


  useEffect(() => {
    api.get(`/${userName}`)
          .then(response => setUser(response.data))
          .catch(err =>{
                  setError(err)
                  handleSearchUser('caiopy')
          })
          .finally(() =>{
                  setIsFetching(false)
          })
    }, [userName,user]);

    




  return (
    <UserContext.Provider value={{ user, userName,handleSearchUser,isFetching,error }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  return context
}