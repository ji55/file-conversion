<template>
  <div class="mainPage">
    <h1 class="mainTitle">{{ kor.MainPage.MainTitle }}</h1>
    <router-link to="Img2Pdf" class="mainSquare">
      <h4>{{ kor.MainPage.ImgToPdf }}</h4>
    </router-link>
    <div class="mainSquare" v-for="x in 3" :key="x">
      <h4>{{ kor.MainPage.Empty }}</h4>
    </div>
  </div>
</template>

<script>
import kor from "../../kor.json";

export default {
  name: "MainPage",
  data() {
    return {
      kor,
    };
  },
};
</script>

<style scoped>
.mainPage {
  position: relative;
  top: 30%;
}

.mainTitle {
  text-align: center;
}

.mainSquare {
  width: 150px;
  border-radius: 5px;
  display: inline-block;
  margin: 10px;
  color: white;
  text-align: center;
  line-height: 150px;
  background: linear-gradient(#252525, #252525 50%, #ffe5ec 50%, #ff8fab);
  background-size: 100% 200%;
  transition: all 0.7s;
  cursor: pointer;
}

.mainSquare:hover {
  background-position: 100% 100%;
  transform: scale(1.1);
  transition: all 0.7s;
  color: black;
}
</style>
