export default function () {

    /*
    ジェネリクスの基本構文
    */
    // 引数の直前に<任意の名前>とすることで、型のパラメーターとなり
    // 呼び出しもとで、型を引数として渡すことが出来る
    function copy<T>(value: T): T {
        let num: T;
        return value;
    }

    copy<string>("hello"); // 明示的に型を宣言することもできる

    // 型推論でリテラル型となる
    copy(true);
    copy(5);


    /*
    型パラメーターに制約を付ける
    */
    // 以下のような関数においてvalue.nameにアクセスするには
    // あらかじめ引数にオブジェクトの型を宣言し、nameキーの存在を担保する必要がある
    function copyObj(value: { name: string }) {
        return value.name;
    }

    copyObj({ name: "Quill" });

    // これをジェネリクスを用いて書くと以下のように！
    // 型パラメーターの後ろにextends 型　とすることで、型の引数に制約を付けることが出来る
    function copyObj2<T extends { name: string }>(value: T) {
        return value;
    }

    copyObj2({ name: "Quill" }); // {name:string}を満たしているのでOK
    copyObj2("Quill"); // オブジェクトではないのでエラー
    copyObj2({ first: "Quill" }); // キーがnameではないのでエラー


    /*
    keyof演算子
    */
    // keyof演算子はオブジェクトの先頭のキーからなるユニオン型を生成する
    type K = keyof { name: string; age: number };

    // ジェネリクスに応用
    // 以下のようにすることで、
    function copyObj3<T extends { name: string, age: number }, U extends keyof T>(value: T, key: U) {
        return value[key]; // ※オブジェクトの呼び出しは.でも[]でもOK
    }

    copyObj3({ name: "Quill", age: 30 }, "age");


    /*
    クラスでジェネリクスを使う
    */
    // クラス名の後ろに型パラメーター宣言
    class LightDatabase<T extends string | number> {
        private data: T[] = [];
        add(item: T) {
            this.data.push(item);
        }
        remove(item: T) {
            this.data.splice(this.data.indexOf(item), 1);
        }
        get() {
            return this.data;
        }
    }

    // これによりstringの配列を扱うクラスにできる
    const stringLightDatabase = new LightDatabase<string>();
    stringLightDatabase.add("apple");
    stringLightDatabase.add("banana");
    stringLightDatabase.add("grape");
    stringLightDatabase.remove("banana");
    console.log(stringLightDatabase.get()); // 結果：　["apple" , "grape"]
}