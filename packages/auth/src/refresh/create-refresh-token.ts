import { randomUUID } from 'crypto'

export function createRefreshToken() {
  return {
    token: randomUUID(),    
    tokenId: randomUUID(), 
    familyId: randomUUID()   
  }
}
