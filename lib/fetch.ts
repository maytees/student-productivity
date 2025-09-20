import axios from "axios"
import { env } from "./env"

export const generateInstagramTokens = async (code: string) => {
    const instaForm = new FormData()

    instaForm.append("client_id", env.INSTAGRAM_APP_ID)
    instaForm.append("client_secret", env.INSTAGRAM_APP_SECRET)
    instaForm.append("grant_type", "authorization_code")
    instaForm.append("redirect_uri",
        `${env.NEXT_PUBLIC_SITE_URL}/callback/instagram`
    )
    instaForm.append("code", code)

    const shortTokenRes = await fetch(env.INSTAGRAM_TOKEN_URL, {
        method: "POST",
        body: instaForm
    })

    const token = await shortTokenRes.json()

    if (token.permissions.length > 0) {
        console.log(token, 'got permission')
        const longToken = await axios.get(
            `${env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${env.INSTAGRAM_APP_SECRET}&access_token=${token.access_token}`
        )

        return longToken.data
    }

}