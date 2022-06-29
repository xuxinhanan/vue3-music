<template>
  <m-header></m-header>
  <tab></tab>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <player></player>
</template>

<script>
import Header from "@/components/header/header";
import Tab from "@/components/tab/tab";
import Player from "@/components/player/player.vue";

export default {
  components: {
    MHeader: Header,
    Tab,
    Player,
  },
};
</script>
