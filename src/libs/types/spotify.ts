// Spotify APIで取得できるデータの型定義

// Spotifyの認証APIが返却するレスポンス
// see: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
type SpotifyAuthApiResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

// 楽曲検索で返却されるトラックデータのうち、アプリに必要なもの
// see: https://developer.spotify.com/console/get-search-item/
type SpotifyAlbumImage = {
  height: number;
  url: string;
  width: number;
};

type SpotifyAlbum = {
  href: string;
  images: SpotifyAlbumImage[];
  name: string;
};

type SpotifyArtist = {
  href: string;
  name: string;
};

type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  href: string;
  id: string;
  name: string;
};

// 楽曲検索時にSpotify APIが返してくる生のJSON
type SpotifyTrackSearchApiResponse = {
  tracks: {
    items: SpotifyTrack[];
  };
};

// 楽曲分析で取得できる情報のうち、アプリに必要なもの
// see: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
type SpotifyAudioFeatures = {
  acousticness: number;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  liveness: number;
  loudness: number;
  mode: 0 | 1;
  speechiness: number;
  tempo: number;
  time_signature: 4;
  track_href: string;
  valence: number;
};

type SpotifyAudioFeaturesApiResponse = {
  audio_features: SpotifyAudioFeatures[];
};

export type {
  SpotifyAuthApiResponse,
  SpotifyTrack,
  SpotifyTrackSearchApiResponse,
  SpotifyAudioFeatures,
  SpotifyAudioFeaturesApiResponse,
};
