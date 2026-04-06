# TypeScript チュートリアル

Vite + TypeScript を使った学習用リポジトリです。基本的な型システムからオブジェクト指向プログラミングまで、TypeScript の主要な概念をコードと日本語コメントで学べます。

## 学習トピック

### 型システム基礎 ([`src/type.ts`](./src/type.ts))

| トピック | 概要 |
|---|---|
| 型推論・型注釈 | TypeScript が型を予測する仕組みと、明示的な型宣言の使い分け |
| プリミティブ型 | `boolean` / `number` / `string` |
| オブジェクト型 | ネストしたオブジェクトへの型定義 |
| 配列・タプル型 | `string[]` / `[string, number, boolean]` |
| `enum` 型 | 定数グループのオブジェクト定義 |
| `any` / `unknown` 型 | 違いと使い分け（`any` の危険性） |
| `union` 型 | `number \| string` のように複数の型を許容 |
| `Literal` 型 | 特定の値のみを許容する型 |
| `type` エイリアス | 型に名前をつけて再利用 |
| 関数の型定義 | パラメーターと戻り値への型注釈、コールバックの型定義 |
| `void` / `never` 型 | 戻り値なし関数と処理が終わらない関数 |
| `satisfies` 演算子 | 型チェックのみを行う演算子 |

### インターフェース ([`src/interface.ts`](./src/interface.ts))

| トピック | 概要 |
|---|---|
| `interface` の基本 | オブジェクト型の定義と `?` オプショナルプロパティ |
| `extends` による継承 | interface の拡張と型エイリアスとの比較 |
| `implements` | クラスへの interface の適用 |

### クラス ([`src/class.ts`](./src/class.ts))

| トピック | 概要 |
|---|---|
| クラスの基本 | `constructor` / フィールド / メソッド |
| アクセス修飾子 | `public` / `private` / `protected` / `readonly` |
| constructor 省略記法 | 修飾子をパラメーターに付ける書き方 |
| 継承 (`extends`) | 親クラスのプロパティとメソッドを引き継ぐ |
| 抽象クラス (`abstract`) | 継承専用クラスと抽象メソッド |
| ゲッター・セッター | `get` / `set` でプロパティへのアクセスを制御 |
| `static` | インスタンスなしで使えるクラスメンバー |
| シングルトンパターン | `private constructor` を使った実装例 |

### 高度な型 ([`src/advanced.ts`](./src/advanced.ts))

| トピック | 概要 |
|---|---|
| インターセクション型 (`&`) | 複数の型を合成する |
| Type Guard | `typeof` / `in` / `instanceof` による型の絞り込み |

### 実装例

| ファイル | 内容 |
|---|---|
| [`src/food-app.ts`](./src/food-app.ts) | OOP の総合演習。シングルトンパターン・interface・class を組み合わせたフードスコアアプリ |
| [`実装例carousel.md`](./実装例carousel.md) | JS のカルーセルを TypeScript に変換する例。型アサーション (`as`) の解説付き |

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

詳細な環境構築手順は [`環境構築.md`](./環境構築.md) を参照してください。

## 技術スタック

- [TypeScript](https://www.typescriptlang.org/) ~5.6
- [Vite](https://vitejs.dev/) ^6.0
