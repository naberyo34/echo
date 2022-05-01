declare namespace NodeJS {
  interface ProcessEnv {
    readonly BASE_URL: string;
    readonly SPOTIFY_CLIENT_ID: string;
    readonly SPOTIFY_CLIENT_SECRET: string;
    readonly SPOTIFY_REDIRECT_URI: string;
    readonly SESSION_PASSWORD: string;
  }
}
