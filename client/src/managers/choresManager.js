const api_Url = "/api/chores"

export const getAllChores = () => {
    return fetch(api_Url).then(res => res.json())
}

export const DeleteChore = (id) => {
    return fetch(`${api_Url}/${id}`, {
        method: 'DELETE'
    })
}

export const getChoreDetails = (id) => {
    return fetch(`${api_Url}/${id}`).then(res => res.json())
}

export const postChores = (choreObj) => {
    return fetch(api_Url, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: (JSON.stringify(choreObj))
    })
}