<template>
  <q-page class="flex flex-center">
    <div class="input-container">
      <h2>Convert any YouTube Video to MP3</h2>
      <q-input
        filled
        label="Youtube Link"
        v-model="link"
        :error="!isValid"
        error-message="Not a valid Youtub link!"
      />
      <q-btn :disable="!isValid || this.link === ''" @click="convertVideo">
        Convert Video
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      link: "",
    };
  },
  methods: {
    async convertVideo() {
      try {
        const video = await this.$axios.post(
          "http://localhost:5000/youtube/convertVideo",
          this.link
        );
        console.log(video.data);
      } catch (err) {
        console.log(err.message);
      }
    },
  },

  computed: {
    isValid() {
      const regex = new RegExp(
        "^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$"
      );

      if (this.link && regex.test(this.link) !== true) {
        return false;
      }

      return true;
    },
  },
});
</script>
