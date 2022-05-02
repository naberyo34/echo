# echo (※開発中)

![OGP](https://user-images.githubusercontent.com/39970521/166095770-cb284403-fdf1-4d2e-84e5-7441cf88dcb9.png)

音楽をひろげる。

## 概要

https://echo.szmd.jp/

Spotify API を活用した音楽分析、発掘アプリ。
思いもよらない、新たな音楽への出会いをお手伝いします。

## 技術

- TypeScript
- Next.js
- Vercel
- axios / SWR
- Spotify API

## 開発メモ

### Getting Started

```
yarn
yarn dev
```

### API 通信について

Next.js の API Routes を BFF として用いる設計としています。
クライアントサイドでの API コールはすべて API Routes に向け、外部 API のコールは全て API Routes 上で実行してください。データの整形なども API Routes で行います。
