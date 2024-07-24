# Configurable Music App template with a player

This is a fully configurable music app template with a functional music player. You can customize the HOME page with text and images. You can add links to music videos, and mp3 files to play straight from the app. You can also add links to your social media accounts.

## Features

- Fully configurable
- Functional music player
- Add links to music videos
- Add links to mp3 files
- Add links to social media accounts

## Instructions

1. Clone this repository
2. Modify public/config.json to your liking
   Config schema:

```
interface Config {
    home: {
        layout: LayoutItem[]
    },
    audio: {
        categories: {
            title: string,
            tracks: {
                title: string;
                artist: string;
                album: string;
                pictureUrl: string;
                src: string;
            }[],
        }[],
    },
    video: {
        categories: {
            title: string,
            items:  {
                title: string,
                src: string,
            }[],
        }[],
    },
    social: {
        links: {
            title: string,
            url: string,
            iconSrc: string,
        }[],
    },
    copyright: {
        desktop: string,
        mobile: string,
    }
}
```

where layout item is any of the following:

```
type LayoutItem = {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p",
    type: "text",
    isMainHeader?: boolean,
    isBold?: boolean,
    text: string
} | {
    variant: "textBlock",
    type: "element",
    content: LayoutItem[],
} | {
    variant: "p",
    type: "compoundText",
    content: LayoutItem[],
} | {
    type: "logo",
    src: string,
    size?: "large",
}
```

this allows for for a recursive and flexible layout structure.

Audio and video configs allow for structuring your music and video links into categories, e.g. albums, genres, etc.
You can see and modify the example `public/config.json` file to get a better understanding of how to structure your data.

3. Place all of the resources used in the config file in the `public` folder
4. If you want to use the included terraform config, you need to set up your local environment with permissions required to create the resources, such as an S3 bucker, a CloudFront distribution, and an ACM certificate. Then copy the `terraform.tfvars.example` file to `terraform.tfvars` and fill in the required values.
5. If you want to use the supplied github workflow for easy deployment, you need to set up the following secrets in your repository:
   - AWS_ACCESS_KEY_ID - the access key id for the user with the required permissions
   - AWS_CONTENT_S3_BUCKET - the name of the S3 bucket where the dynamic content will be stored (public folder including config)
   - AWS_S3_BUCKET - the name of the S3 bucket where the website will be hosted
   - AWS_SECRET_ACCESS_KEY - the secret access key for the user with the required permissions
   - CLOUDFRONT_DISTRIBUTION_ID - the id of the CloudFront distribution
   - REACT_APP_WEBSITE_DESCRIPTION - the description of the website, used for SEO
   - REACT_APP_WEBSITE_TITLE - the title of the website, shown in the browser tab
   