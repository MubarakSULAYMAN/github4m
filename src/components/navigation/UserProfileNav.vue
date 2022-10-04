<template>
  <section>
    <div class="user-summary">
      <div class="user-details">
        <img
          :src="userProfile?.avatarUrl"
          :alt="userProfile?.name"
          class="image-round-full"
          title="Change your avatar"
        />

        <div class="user-info">
          <div class="fullname" v-text="userProfile?.name || 'Full Name'" />
          <div class="username" v-text="userProfile?.login || 'Username'" />
        </div>
      </div>

      <div class="status-emoji" tabindex="0">
        <IconEmoji />
        <span class="status">Status</span>
      </div>
    </div>

    <div class="user-overview">
      <div class="fullname" v-text="userProfile?.name" />
      <div class="username" v-text="userProfile?.login" />
      <p class="bio" v-html="userProfile?.bioHTML" />
      <button>Edit profile</button>

      <div class="follow-group">
        <div class="followers">
          <IconPeople />
          <span class="count" v-text="followersCount || 0" />
          <span v-if="followersCount! > 1">followers</span>
          <span v-else>follower</span>
        </div>

        <span>&ensp;<b>&middot;</b>&ensp;</span>

        <div class="following">
          <span class="count" v-text="userProfile?.following?.totalCount || 0" />
          <span>following</span>
        </div>
      </div>

      <div class="icon-text company" v-if="userProfile?.company">
        <IconBuilding />
        <a
          :href="`https://github.com/${userProfile?.company.slice(1)}`"
          target="_blank"
          rel="noopener noreferrer"
          v-text="userProfile?.company"
        />
      </div>

      <div class="icon-text" v-if="userProfile?.email">
        <IconMail />
        <a :href="`mailto:${userProfile?.email}`" v-html="userProfile?.email" />
      </div>

      <div class="icon-text" v-if="userProfile?.twitterUsername">
        <IconTwitter />
        <a
          :href="`https://twitter.com/${userProfile?.twitterUsername}`"
          target="_blank"
          rel="noopener noreferrer"
          v-text="`@${userProfile?.twitterUsername}`"
        />
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
import { computed } from 'vue';
import { useSharedStore } from '@/stores/shared';
import IconEmoji from '@/components/icons/IconEmoji.vue';
import IconPeople from '@/components/icons/IconPeople.vue';
import ItemGroup from '@/components/card/ItemGroup.vue';
import IconBuilding from '@/components/icons/IconBuilding.vue';
import IconMail from '@/components/icons/IconMail.vue';
import IconTwitter from '@/components/icons/IconTwitter.vue';

const store = useSharedStore();
const userProfile = computed(() => store.currentUser?.user);
const followersCount = computed(() => userProfile.value?.followers?.totalCount);
</script>

<style scoped>
section {
  width: 80%;
  margin-left: auto;
}

.user-summary {
  position: relative;
  width: fit-content;
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

.follow-group,
.follow-group [class^='follow'],
.icon-text {
  display: flex;
  align-items: center;
}

.follow-group [class^='follow'] {
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

.icon-text svg {
  margin-right: 12px;
}

p.bio :deep(a) {
  font-size: 16px;
}

.icon-text a {
  font-size: 14px;
}

p.bio :deep(a),
.icon-text a {
  color: var(--color-text);
}

.icon-text a:hover {
  text-decoration: underline;
}

.icon-text:not(.company) a:hover {
  color: var(--gh4-blue);
}

.icon-text.company {
  margin-top: 8px;
}

p.bio :deep(a),
.icon-text.company a {
  font-weight: 600;
}

svg.octicon-twitter {
  width: 16px;
  height: 16px;
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
