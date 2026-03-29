/*
OOP(オブジェクト指向プログラミング)に基づいた実装
*/
export default function foodApp() {
    interface ScoreAble{
        readonly totalScore:number;
        render():void;
    }
    interface FoodAble{
        element:HTMLDivElement;
        clickEventHandler():void;
    }
    interface FoodsAble{
        elements:NodeListOf<HTMLDivElement>;
        readonly activeElements:HTMLDivElement[];
        readonly activeElementsScore:number[];
    }

    /**
     * Foodクラス
     * 要素の取得（全体要素及び、active付与された要素と、その中のscoreクラス要素）
     * Foodの呼び出しと実行→Scoreに連鎖
     */
    class Foods implements FoodsAble {
        private static instance: Foods;
        private constructor() {
            this.elements.forEach((element) => {
                new Food(element);
            });
        }
        static getInstance() {
            if (!Foods.instance) {
                Foods.instance = new Foods();
            }
            return Foods.instance;
        }

        // 全体のfood要素を取得
        elements = document.querySelectorAll<HTMLDivElement>('.food');

        // activeクラスが付与されたfood要素を取得し配列に格納
        private _activeElements: HTMLDivElement[] = [];
        get activeElements() {
            this._activeElements = [];
            this.elements.forEach((element) => {
                if (element.classList.contains('food--active')) {
                    this._activeElements.push(element);
                }
            });
            return this._activeElements;
        }

        // activeクラスが付与されたfood要素のscoreを取得し配列に格納
        private _activeElementsScore: number[] = [];
        get activeElementsScore() {
            this._activeElementsScore = [];
            this.activeElements.forEach((element) => {
                const foodScore = Number(
                    element.querySelector('.food__score')?.textContent,
                );
                this._activeElementsScore.push(foodScore);
            });
            return this._activeElementsScore;
        }
    }

    /**
     * Foodクラス
     * ※Foodsで取得した.food要素のforEach内で動作
     * 要素のクリックイベント監視（activeクラス付与、Scoreの呼び出しと実行）
     */
    class Food implements FoodAble {
        constructor(public element: HTMLDivElement) {
            element.addEventListener(
                'click',
                this.clickEventHandler.bind(this), //bind():clickEventHandlerのthisがelementではなくFoodクラスだと伝える
            );
        }
        
        clickEventHandler() {
            this.element.classList.toggle('food--active');
            const score = Score.getInstance();
            score.render();
        }
    }

    /**
     * Scoreクラス
     * スコアの計算・描画処理
     */
    class Score implements ScoreAble {
        private static instance: Score;
        private constructor() {}
        static getInstance() {
            if (!Score.instance) {
                Score.instance = new Score();
            }
            return Score.instance;
        }

        // activeクラスが付与された要素のscoreを合計
        get totalScore() {
            const foods = Foods.getInstance();
            return foods.activeElementsScore.reduce(
                (total, score) => total + score,
                0,
            );
        }

        // 合計したscoreを要素に描画
        render() {
            document.querySelector('.score__number')!.textContent = String(
                this.totalScore,
            );
        }
    }

    // entry point
    Foods.getInstance();
}
