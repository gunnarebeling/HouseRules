const api_Url = "/api/userprofile"
export const getAllUsers = () => {
    return fetch(api_Url).then(res => res.json())
}

export const getUserDetials = (id) => {
    return fetch(`${api_Url}/${id}`).then(res => res.json())
}