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

export const completeChore = (id, userId) => {
    return fetch(`${api_Url}/${id}/completed?userId=${userId}`, {
        method: 'POST',
        
    })
}

export const assignUsertoChore = (id, userId) => {
    return fetch(`${api_Url}/${id}/assign?userId=${userId}`, {
        method: 'POST',
        
    })
}

export const unassignUsertoChore = (id, userId) => {
    return fetch(`${api_Url}/${id}/unassign?userId=${userId}`, {
        method: 'POST',
        
    })
}