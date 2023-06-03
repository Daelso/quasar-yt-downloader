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
        this.$q.loading.show({
          message: "Downloading your video...",
        });
        const title = await this.$axios.post(
          "http://localhost:5000/youtube/getTitle",
          { link: this.link }
        );

        const video = await this.$axios.post(
          "http://localhost:5000/youtube/downloadVideo",
          { link: this.link },
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([video.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title.data}.mp4`);
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        this.$q.notify({
          type: "negative",
          message:
            "Failed to download your video! Try again or test another video.",
        });
      }
      this.$q.loading.hide();
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
