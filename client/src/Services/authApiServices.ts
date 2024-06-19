
const baseUrl =  'http://localhost:3000'


export const signUp = async ({username, email, password}) => {
  const user = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, password})
  })
  
  const resp = await user.json()
  if (!user.ok) {
    throw new Error(`Request failed with status ${user.status}`);
  }

  if (resp.error) {
    throw new Error(resp.error.message || "Signup failed. Please check your information.");
  }
  
  return resp

}  

export const logIn = async ({ username, password}) => {
  const user = await fetch(`${baseUrl}/login`, { 
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password})
  })

  const resp = await user.json()
  
  if (!user.ok) {
    throw new Error(`Request failed with status ${user.status}`);
  }

  if (resp.error) { 
    throw new Error(resp.error.message || "Sign-in failed. Please check your credentials.");
  }

  return resp
} 

export const logOut = async () => {
  await fetch(`${baseUrl}/auth/signout`) 
}  