import { NextApiHandler } from 'next';
import axios from 'axios';
import withSession from 'libs/middlewares/withSession';
import { SpotifyTrackSearchApiResponse } from 'libs/types/spotify';
import { BFFTrackFullData } from 'libs/types/bff';
import getTracksAudioFeatures from 'libs/utils/getTracksAudioFeatures';

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
    const searchTracksResponse = await axios.get<SpotifyTrackSearchApiResponse>(
      url,
      config,
    );

    // 検索結果の楽曲に対して、楽曲分析情報も取得する
    const searchTracksIds = searchTracksResponse.data.tracks.items.map(
      (item) => item.id,
    );
    const searchTracksAudioFeatures = await getTracksAudioFeatures(
      searchTracksIds,
      accessToken,
    );

    // 対応する楽曲データと楽曲分析データを結合する
    const searchTracksFullData: BFFTrackFullData[] =
      searchTracksResponse.data.tracks.items.map((item) => {
        const targetAudioFeatures =
          searchTracksAudioFeatures.data.audio_features.find(
            (data) => data.id === item.id,
          );

        console.log({ targetAudioFeatures });

        return { ...item, audio_features: targetAudioFeatures };
      });

    const result = searchTracksFullData;

    res.status(200).json(result);
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message);
  }
};

export default withSession(handler);
