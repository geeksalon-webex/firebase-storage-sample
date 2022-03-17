# storage-sample

Vue3 (Options API) と firebase storage (v9) を使った画像の投稿・表示機能のサンプルです。

## ローカルで動かして確認するには

### 1. ダウンロードする

```bash
git clone https://github.com/geeksalon-webex/firebase-storage-sample.git
cd firebase-storage-sample
npm ci
```

### 2. firebase と連携する

1. `src/firebase.js` を開いて `firebaseConfig` を自分の firebase プロジェクトのものに置き換える。
2. firebase コンソールで firebase storage を有効化する
3. firebase コンソールの「Rules」タブで firebase storage のルールを変更する

とりあえず、開発で確認するための firebase storage のルールの例
(誰でも書き込めるようになるので、絶対に本番環境では使用しないでください)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. 起動する

```bash
npm run serve
```
