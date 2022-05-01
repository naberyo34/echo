import { NextApiHandler } from 'next';
import axios from 'axios';
import withSession from 'lib/middlewares/withSession';
import {
  SpotifyTrackSearchApiResponse,
  SpotifyTrackSearchResult,
} from 'lib/types/spotify';

/**
 * 楽曲検索
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    const endpoint = 'https://api.spotify.com/v1/search';
    const query: string = req.body.query;
    const accessToken = req.session.user.accessToken;
    const searchParams = new URLSearchParams();

    // see: https://developer.spotify.com/console/get-search-item/
    searchParams.append('q', query);
    searchParams.append('type', 'track');
    const url = `${endpoint}?${searchParams.toString()}`;
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const trackSearchResponse = await axios.get<SpotifyTrackSearchApiResponse>(
      url,
      config,
    );
    const result: SpotifyTrackSearchResult = {
      tracks: trackSearchResponse.data.tracks.items,
    };

    res.status(200).json(result);
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message);
  }
};

export default withSession(handler);
