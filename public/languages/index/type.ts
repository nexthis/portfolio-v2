export default interface type extends seo{
    "home": {
        "subTitle": string,
        "title": string,
        "description": string,
        "contact": {
            "text": string,
            "link": string
        }
    },
    "skills": Array<{
        "name": string,
        "image": {
            "src": string,
            "alt": string
        },
        "items": Array<{
            "name": string,
            "description": string,
            "image": {
                "src": string,
                "alt": string
            },
        }>
    }>,
    "contact": {
        "form": {
            "title": string,
            "name": string,
            "phone": string,
            "email": string,
            "message": string,
            "clause": string,
            "send": string,
        }
    }
}