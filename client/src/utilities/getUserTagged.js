import { useMemo } from 'react'

const getUserTagged = (text) => {

    if(typeof text !== "function") return []
    
    const usersTagged = useMemo(() => {
        const regex = /@(\w+)/g;
    
        const matches = text()?.match(regex);
    
        // eslint-disable-next-line array-callback-return
        const usersMatcheds = new Set(matches?.map((match) => {
          if (match) return match.substring(1)
        }))
        return usersMatcheds
      }, [text()])

      return usersTagged
}

export default getUserTagged