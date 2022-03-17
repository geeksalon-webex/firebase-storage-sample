<template>
  <div>
    <h2>ImageViewer</h2>
    <button @click="getImages">更新</button>
    <div>
      <div v-for="image in images" :key="image.id">
        <img :src="image.url" :alt="image.name" />
        <div>{{ image.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { getDocs, query, collection, orderBy, limit } from "firebase/firestore";

export default {
  data() {
    return {
      images: [],
    };
  },
  methods: {
    getImages() {
      /**
       * firestore の images コレクションを示す クエリ を作成する。
       * クエリとは、データベースに対して「これでデータを取得してください!」と示すもの。
       * Googleで検索する時のキーワードの羅列のイメージ。
       * 参考：https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja#get_multiple_documents_from_a_collection
       * 参考：https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#execute_a_query
       */

      const imagesQuery = query(
        collection(db, "images"),
        orderBy("createdAt"),
        limit(5)
      );
      getDocs(imagesQuery).then((collection) => {
        this.images = collection.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        // 上は下のコードと同じ意味
        // map については Array.prototype.map で調べてみてください
        // ... はスプレッド構文と言いオブジェクトのプロパティを展開してくれます。
        // const images = [];
        // for (let i = 0;i < images.length;i++) {
        //   images.push({
        //     id: doc.id,
        //     name: doc.data().name,
        //     url: doc.data().url,
        //     createdAt:  doc.data().createdAt
        //   });
        // }
        // this.images = images;
      });
    },
  },
  mounted() {
    this.getImages();
  },
};
</script>
