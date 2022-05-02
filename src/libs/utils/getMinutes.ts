/**
 * ミリ秒 => mm:ssに変換
 * @param milliseconds
 * @returns 表示用の分数
 */
const getMinutes = (milliseconds: number) => {
  const date = new Date(milliseconds);
  const min = date.getMinutes();
  // 秒はzero paddingする
  const sec = `0${date.getSeconds()}`.slice(-2);

  return `${min}:${sec}`;
};

export default getMinutes;
