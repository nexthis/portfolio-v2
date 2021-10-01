import type {Document as DocumentInterface} from "@prismicio/client/types/documents";
import type {RichTextBlock} from "prismic-reactjs";

export interface PrismicDataInterface<T = any> extends DocumentInterface {
    data: T,
}

export interface PrismicDataPortfolio {
    created: string,
    content: RichTextBlock[],
    type: string,
    image: {
        alt: string,
        url: string,
        dimensions: {
            height: number
            width: number
        }
    },
    title: RichTextBlock[],
    short: RichTextBlock[],
    website_url: {
        link_type: string
        target: string
        url: string
    },

    responsive_device_mockup: {
        alt: string,
        url: string,
        dimensions: {
            height: number
            width: number
        }
    },
    seo_description: RichTextBlock[],
    seo_image: {
        alt: string,
        url: string,
        dimensions: {
            height: number
            width: number
        }
    },
    technologies: Array<{ technology: string }>
    seo_title: RichTextBlock[]
}