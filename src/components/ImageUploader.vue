<template>
  <div>
    <h2>ImageUploader</h2>
    <!-- 画像だけが選択できるように accept を設定する -->
    <!-- アップロード中は disabled で選択できないようにする -->
    <input
      type="file"
      accept="image/*"
      :disabled="disabled"
      @change="onFileChange"
    />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import { db, storage } from "@/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
export default {
  data() {
    return {
      disabled: false,
      message: "",
    };
  },
  methods: {
    onFileChange(e) {
      /**
       * ブラウザで画像などのファイルを扱うには、File API を使う
       * 参考：https://developer.mozilla.org/ja/docs/Web/API/File/Using_files_from_web_applications
       * 参考：https://code-kitchen.dev/html/input-file/
       */

      // <input type="file"> で選択されたファイルは e.target.files の配列に入っている。
      const file = e.target.files[0];
      this.upload(file);
    },
    upload(file) {
      this.message = "アップロード中...";
      this.disabled = true;

      /**
       * firestorage のどこにどういうファイル名で保存するかを参照する Ref を作る。
       * 参考：https://firebase.google.com/docs/storage/web/create-reference?hl=ja&authuser=0#create_a_reference
       */
      const createdAt = new Date();
      // 同じ名前のファイルと区別できるように createdAt.getTime() を追加して、ユニークなファイル名をつける
      const uniqueFileName = createdAt.getTime() + "_" + file.name;
      const fileRef = ref(storage, "images/" + uniqueFileName);

      /**
       * uploadBytes() を使って、ファイルをfirstorageにアップロードする
       * その後、画像のURLを取得してfirestoreのデータベースに保存する
       * 参考：https://firebase.google.com/docs/storage/web/upload-files?hl=ja&authuser=0#upload_from_a_blob_or_file
       */
      uploadBytes(fileRef, file)
        // この時点でアップロードが完了している。 snapshot.getDownloadURL() でアップロードしたURLを取得する。
        .then((snapshot) => snapshot.getDownloadURL())
        .then((url) => {
          const image = {
            name: file.name,
            url, // url : url と同じ。オブジェクトでプロパティのキーとバリューの名前が同じ時は省略できる。
            createdAt,
          };
          return addDoc(collection(db, "images"), image);
        })
        .then(() => {
          this.message = "アップロード完了！";
          setTimeout(() => {
            this.message = "";
            this.disabled = false;
          }, 1000);
        });
    },
  },
};
</script>
