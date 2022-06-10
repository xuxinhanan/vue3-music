import { computed } from "vue";
import { useStore } from "vuex";
import { save, remove } from "@/assets/js/array-store";
import { FAVORITE_KEY } from "@/assets/js/constant";

export default function useFavorite() {
  const store = useStore();
  const favoriteList = computed(() => store.state.favoriteList);
  const maxLen = 100;

  function favoriteIconStyle(song) {
    return isFavoriteSong(song) ? "icon-favorite" : "icon-not-favorite";
  }

  // 点击之后切换
  function toggleFavorite(song) {
    let list;
    if (isFavoriteSong(song)) {
      list = remove(FAVORITE_KEY, compare);
    } else {
      list = save(song, FAVORITE_KEY, compare, maxLen);
    }
    store.commit("setFavoriteList", list);

    function compare(item) {
      return item.id === song.id;
    }
  }

  function isFavoriteSong(song) {
    return (
      favoriteList.value.findIndex((item) => {
        return song.id === item.id;
      }) > -1
    );
  }

  return {
    favoriteIconStyle,
    toggleFavorite,
  };
}
