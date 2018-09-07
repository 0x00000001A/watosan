<template>
  <div class="article__form">
    <div class="form">
      <div class="form__row">
        <label
          class="form__label"
          for="username">Name</label>
      </div>
      <div class="form__row">
        <input
          id="username"
          class="form__input"
          type="text"
          name="name"
          placeholder="Nickname">
      </div>
      <div class="form__row">
        <label
          class="form__label"
          for="useremail">Email</label>
      </div>
      <div class="form__row">
        <input
          id="useremail"
          class="form__input"
          type="email"
          name="email"
          placeholder="user@example.com">
      </div>
      <div class="form__row">
        <label
          class="form__label"
          for="usermessage">Message</label>
      </div>
      <div class="form__row">
        <textarea
          id="usermessage"
          v-model="md"
          class="form__textarea"
          name="message"
          placeholder="A long time ago in a galaxy far far away..."/>
      </div>
      <div class="form__row">
        <button type="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
