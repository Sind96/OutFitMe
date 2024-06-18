
const baseUrl =  'http://localhost:3000'




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
