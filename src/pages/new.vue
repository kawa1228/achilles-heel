<template>
  <section class="new">
    <h1>new post</h1>
    <article class="new__note">
      <button>アイキャッチ画像投稿</button>
      <input type="text" placeholder="タイトル" />
      <textarea id="" name="" cols="30" rows="10" placeholder="本文" />
    </article>
  </section>
</template>

<style lang="scss" scoped>
.new {
  &__note {
    display: flex;
    flex-direction: column;
  }
}
</style>
