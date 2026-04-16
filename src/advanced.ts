export default function () {
    /* 
    インターセクション型
    */
    // typeエイリアスの場合
    type Engineer = {
        name: string;
        role: string;
    };
    type Blogger = {
        name: string;
        follower: number;
    };

    // & で複数のtypeを合わせた型を作れる
    type EngineerBlogger = Engineer & Blogger;

    // interfaceの場合
    interface Manager {
        name: string;
        role: string;
    }
    interface Leader {
        name: string;
        follower: number;
    }

    // typeで合わせることも、interfaceのextendsで合わせたることも可能
    type ManagerLeader = Manager & Leader;
    interface MgLd extends Manager, Leader { }

    // Engineer型とBlogger型のユニーク値を全て持たないとダメ
    const john: EngineerBlogger = {
        name: 'john',
        role: 'front-end',
        follower: 1000,
    };

    console.log(john);

    // string型とnumber型を兼ねたデータは存在しない
    // この場合tmpはnever型となる！
    type tmp = string & number;

    // Union型のインターセクションは、重複する値のみを抽出
    type NumberBoolean = number | boolean;
    type StringNumber = string | number;
    type Mix = NumberBoolean & StringNumber; // number型となる

    /*
    type guard
    （型を絞り込む３つの手法）
    */
    // type of演算子
    function toUpperCase(x: string | number) {
        if (typeof x === 'string') {
            x.toUpperCase(); // string型のメソッドがサジェスト
        } else {
            x.toFixed(); // number型のメソッドがサジェスト
        }
    }

    // in 演算子
    type NomadWorker = Engineer | Blogger;
    function describeProfile(nomadWorker: NomadWorker) {
        if ('role' in nomadWorker) {
            // roleが存在するのはEngineer型のみなのでnomadWorkerはEngineer型となる
            console.log(nomadWorker.role);
        }
    }

    // instance of演算子
    class Dog {
        speak() {
            console.log('bow bow');
        }
    }
    class Bird {
        speak() {
            console.log('tweet tweet');
        }
        fly() {
            console.log('flutter');
        }
    }
    type Pet = Dog | Bird;
    function havePet(pet: Pet) {
        if (pet instanceof Bird) {
            pet.fly(); // instanceofでBird型（クラス）であると保証されているので、flyメソッドがサジェストされる
        } else {
            pet.speak();
        }
    }
    havePet(new Bird());

    /*
    タグ付きUnion型
    */
    class Red {
        kind = 'red';
        color: string = '';
    }
    class Blue {
        kind = 'blue';
        color: string = '';
    }
    class Yellow {
        kind = 'yellow';
        color: string = '';
    }
    class Purple {
        kind = 'purple';
        color: string = '';
    }
    class Orange {
        kind = 'orange';
        color: string = '';
    }
    type Color = Red | Blue | Yellow | Purple | Orange;
    function getColor(color: Color) {
        // if (color instanceof Red) {
        //     console.log(color.color);
        // }else if (color instanceof Blue) {
        //     console.log(color.color);
        // }・・・  ユニオン型が複数ある場合、少し冗長になる
        // そこで、kindプロパティをタグとして、switch文で分岐させるような方法がタグ付きUnion型
        switch (color.kind) {
            case 'red':
                console.log(color.color);
                break;
            case 'blue':
                console.log(color.color);
                break;
            case 'yellow':
                console.log(color.color);
                break;
            case 'purple':
                console.log(color.color);
                break;
            case 'orange':
                console.log(color.color);
                break;
        }
    }


    /*
    型アサーション
    */
    // DOM操作などにおいて型推論では返り値を予測できずHTMLElement|nullとなってしまう
    // これでは取得したDOMに対応するメソッドが上手くサジェストされなかったりする
    // 型アサーションはこのような場面において型を強制的に指定するための機能である

    // 末尾にas 型 と書く方法（推奨）
    const input = document.getElementById('input') as HTMLInputElement;
    input.value = 'initial';

    // DOM取得メソッドの先頭に<型>と書く方法
    // ※ReactなどではJSファイル内にHTMLを記述する為、<>を不用意に使用できないから前者推奨
    (<HTMLTextAreaElement>document.getElementById('text_area')).value =
        'initial';


    /*
    Non-null assertion operator
        ※nullではないと明示的に宣言する方法
    */
    // 式の末尾に！を付けることでnullではないと宣言
    const div = document.getElementById('div')!;


    /*
    インデックスシグネチャ
    */
    interface Designer {
        name: string; // 既存のオブジェクトの方がマッチしてなくてはならない
        [index: string]: string; // キーがstring、値がstringのプロパティをいくつでも作れる
    }
    const designer: Designer = {
        name: "Quill"
    }


    /*
    関数のオーバーロード
    */
    function toUpperCase2(x: string): string; // 関数宣言の上にそれぞれの型に対応する関数を宣言
    function toUpperCase2(x: number): number; // こうすることで返り値の型を詳細に制御できる
    function toUpperCase2(x: string | number) { // オーバーロードした場合、ここの型宣言は呼び出し時に無視
        if (typeof x === 'string') { // 実装時には元の型が適用される
            return x.toUpperCase();
        }
        return x;
    }
    const upperHello = toUpperCase2('Hello'); // 返り値の型推論はstring | numberとなり
    upperHello.toString(); // stringとnumberの両方に対応したメソッドしかサジェストされない


    /*
    Optional Chaining
    */
    interface DownloadedData {
        id: number;
        user?: {
            name?: {
                first: string;
                last: string;
            }
        }
    }

    const downloadedData: DownloadedData = {
        id: 3
    }
    console.log(downloadedData.user?.name?.first); // ？でプロパティがあれば、、という書き方になる
}
