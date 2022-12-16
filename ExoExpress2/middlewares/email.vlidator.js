export const isEmail = (email) => {
    const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    return regex.test(email)
}