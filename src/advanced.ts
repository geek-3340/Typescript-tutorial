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
    interface MgLd extends Manager, Leader {}

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
}
