import { PLAY_MODE } from "@/assets/js/constant";

const state = {
  sequenceList: [], // 顺序列表
  playlist: [], // 播放列表，可能乱序，所以和上一个区分
  playing: false, // 正在播放
  playMode: PLAY_MODE.sqeuence, // 播放模式
  currentIndex: 0, // 当前播放
  fullScreen: false, // 全屏
};

export default state;
