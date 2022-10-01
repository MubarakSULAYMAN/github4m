<template>
  <section>
    <div class="user-summary">
      <div class="user-details">
        <img src="" alt="" class="image-round-full" title="Change your avatar" />

        <div class="user-info">
          <div class="fullname">Mubarak SULAYMAN</div>
          <div class="username">MubarakSULAYMAN</div>
        </div>
      </div>

      <div class="status-emoji" tabindex="0">
        <IconEmoji />
        <span class="status">Status</span>
      </div>
    </div>

    <div class="user-overview">
      <div class="fullname">Mubarak SULAYMAN</div>
      <div class="username">MubarakSULAYMAN</div>
      <p class="bio">
        An experienced and passionate Front-end Engineer. Contributor to kodadot/nft-gallery,
        ex-@heroshe
      </p>
      <button>Edit profile</button>

      <div class="follow-group">
        <div class="followers">
          <IconPeople />
          <span class="count">{{ followersCount }}</span>
          <span v-if="followersCount > 1">followers</span>
          <span v-else>follower</span>
        </div>

        <!-- <span>&ensp;<b>&middot;</b>&ensp;</span> -->
        <span>&emsp;<b>&middot;</b>&emsp;</span>

        <!-- &emsp; -->
        <div class="following">
          <span class="count">{{ followingCount }}</span>
          <span>following</span>
        </div>
      </div>
    </div>

    <ItemGroup title="Organizations">
      <div class="group organization-container">
        <div class="organization-items"></div>
      </div>
    </ItemGroup>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconEmoji from '@/components/icons/IconEmoji.vue';
import IconPeople from '@/components/icons/IconPeople.vue';
import ItemGroup from '@/components/card/ItemGroup.vue';

const followersCount = ref<number>(0);
const followingCount = ref<number>(0);
</script>

<style scoped>
section {
  width: 80%;
  margin-left: auto;
}

.user-summary {
  position: relative;
  margin-top: -40px;
}

.user-summary img {
  width: 300px;
  height: 300px;
  border: 2px solid var(--color-border-hover);
  z-index: 1;
}

.status-emoji {
  position: absolute;
  left: 88%;
  top: 70%;
  width: 38px;
  height: 38px;
  padding: 10px;
  border: 1px solid var(--color-border-hover);
  border-radius: 20px;
  background-color: var(--vt-c-text-dark-1);
  overflow: hidden;
  z-index: 1;
}

.status-emoji:hover {
  width: 80px;
  transition: all 0.5s ease;
}

.status-emoji .status {
  display: inline-block;
  margin-left: 4px;
  font-size: 12px;
  color: var(--gh4-gray-3);
  vertical-align: text-bottom;
  opacity: 0;
  transform: translateX(-100px);
}

.status-emoji:hover .status {
  transform: translateX(0);
  opacity: 1;
  transition: all 0.5s ease, opacity 0.5s ease 0.2s;
}

.status-emoji:hover,
.status-emoji:hover svg,
.status-emoji:hover .status {
  color: var(--gh4-blue);
  cursor: default;
}

.fullname {
  font-size: 24px;
  font-weight: 600;
}

.username {
  color: var(--gh4-gray-3);
  font-size: 20px;
}

.user-details [class$='name'] {
  display: none;
}

button {
  width: 100%;
  margin: 12px 0;
  padding: 8px;
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
  background-color: var(--gh4-gray-4);
}

button:hover {
  background-color: var(--gh4-gray-1);
}

.follow-group {
  display: flex;
  align-items: center;
}

.follow-group [class^='follow'] {
  display: flex;
  align-items: center;
  color: var(--gh4-gray-3);
}

.follow-group .count {
  display: inline-block;
  color: var(--color-text);
  font-weight: 600;
}

.follow-group .count,
.follow-group [class^='follow'] svg {
  margin-right: 4px;
}

.follow-group [class^='follow']:hover,
.follow-group [class^='follow']:hover span,
.follow-group [class^='follow']:hover svg {
  color: var(--gh4-blue);
  cursor: pointer;
}

.user-overview {
  margin-bottom: 12px;
}

@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .user-summary {
    margin-top: -10px;
  }

  .user-summary img {
    width: 200px;
    height: 200px;
  }

  /* .status-emoji {
    position: absolute;
    left: 88%;
    top: 70%;
    width: 38px;
    height: 38px;
    padding: 10px;
    border: 1px solid var(--color-border-hover);
    border-radius: 20px;
    background-color: var(--vt-c-text-dark-1);
    overflow: hidden;
    z-index: 1;
  } */
}

@media only screen and (max-width: 767px) {
  section {
    width: 100vw;
    margin-left: 0;
    padding: 20px;
    padding-bottom: 0;
  }

  .user-details {
    display: flex;
  }

  [class$='name']:not(.user-details [class$='name']) {
    display: none;
  }

  .user-details [class$='name'] {
    display: block;
  }

  .user-summary {
    margin-top: 0;
  }

  .user-summary img {
    width: 70px;
    height: 70px;
    margin-right: 12px;
  }

  .status-emoji {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 32px;
    padding: 5px;
    margin: 32px 0 12px;
    border-radius: 4px;
  }

  .status-emoji .status {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
