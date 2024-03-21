<template>
  <div>
    <h1 style="margin: 10px 0">{{ kor.MainPage.ImgToPdf }}</h1>
    <!-- 파일 업로드, 변환 버튼 -->
    <label
      for="uploadBtn"
      :class="this.progress ? 'customBtn disable' : 'customBtn'"
    >
      <div>{{ kor.Img2Pdf.UploadBtn }}</div>
    </label>
    <input
      type="file"
      id="uploadBtn"
      ref="img"
      accept="image/*"
      multiple="multiple"
      @change="uploadFile"
      style="display: none"
    />
  </div>
  <button
    :class="this.progress ? 'customBtn disable' : 'customBtn'"
    @click="conversion"
  >
    {{
      this.progress
        ? this.progress === this.imageUrl.length
          ? kor.Img2Pdf.ConversionMsg
          : this.progress + "  / " + this.imageUrl.length
        : kor.Img2Pdf.ConversionBtn
    }}
  </button>
  <!-- 업로드 이미지 미리보기 -->
  <div class="previewBox">
    <div class="previewDiv" v-for="(i, idx) in this.imageUrl" :key="idx">
      <img class="previewImg" :src="i" height="150px" width="150px" />
      <p>{{ this.imageList[idx].name }}</p>
      <button class="delBtn" @click="delImg(idx)">삭제하기</button>
    </div>
  </div>
</template>

<script>
import kor from "../../kor.json";
import { PDFDocument, PageSizes } from "pdf-lib";

export default {
  name: "Img2Pdf",
  data() {
    return {
      kor,
      imageList: [],
      imageUrl: [],
      progress: 0,
    };
  },
  methods: {
    uploadFile(e) {
      const uploadFiles = e.target.files;
      Array.from(uploadFiles).forEach((el) => {
        this.imageUrl.push(URL.createObjectURL(el));
        this.imageList.push(el);
      });
    },

    delImg(idx) {
      this.imageUrl.splice(idx, 1);
      this.imageList.splice(idx, 1);
    },

    async fetchImage(dataUrl) {
      const res = await fetch(dataUrl);
      return await res.arrayBuffer();
    },

    async conversion() {
      if (this.imageUrl.length) {
        const pdfDoc = await PDFDocument.create();

        try {
          for (const [idx, imgUrl] of this.imageUrl.entries()) {
            this.progress = idx + 1;
            const imageBytes = await this.fetchImage(imgUrl);
            const image =
              this.imageList[idx].type === "image/jpeg"
                ? await pdfDoc.embedJpg(imageBytes)
                : await pdfDoc.embedPng(imageBytes);

            const page = pdfDoc.addPage();
            page.drawImage(image, {
              x: 0,
              y: 0,
              width: PageSizes.A4[0],
              height: PageSizes.A4[1],
            });
          }
          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], { type: "application/pdf" });

          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "img2pdf.pdf";
          link.click();
          this.progress = 0;
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style scoped>
.progress {
  background: red !important;
}
.customBtn {
  display: inline-block;
  margin-bottom: 5px;
  color: white;
  width: 80%;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(#252525, #252525 50%, #ffe5ec 50%, #ff8fab);
  background-size: 100% 200%;
  transition: all 0.7s;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.disable {
  pointer-events: none;
}

.customBtn:hover {
  background-position: 100% 100%;
  transition: all 0.7s;
  color: #252525;
}

.customBtn > div {
  position: relative;
  top: 3px;
}

.previewDiv {
  width: 150px;
  padding: 5px 5px 0 5px;
  display: inline-block;
}

.previewDiv > p {
  margin: 0;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.previewImg,
.delBtn {
  border-radius: 5px;
}

.previewBox {
  width: 95%;
  height: 70vh;
  margin-top: 10px;
  border: 3px solid #252525;
  border-radius: 5px;
  display: -webkit-inline-box;
  overflow: auto;
}

.delBtn {
  width: 150px;
  border: none;
  background-color: #252525;
  color: white;
}

.delBtn:hover {
  background-color: #ff8fab;
}
</style>
