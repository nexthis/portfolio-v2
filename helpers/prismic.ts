import Prismic from '@prismicio/client'
import {
    apiEndpoint,
    accessToken,
} from 'prismic-configuration'

// Client method to query documents from the Prismic repo
export const Client = (req = null) => (
    Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
)

const createClientOptions = (req = null, prismicAccessToken:string = '') => {
    const reqOption = req ? { req } : {}
    const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
    return {
        ...reqOption,
        ...accessTokenOption,
    }
}

export default Client