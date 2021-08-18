// Gets the URL for the current environment
export const getAbsoluteURL = (path: string = '') => {
    const baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}` : "http://localhost:3000"
    return baseURL + path
}
