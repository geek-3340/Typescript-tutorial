export default function foodApp() {
    /*
    OOP(オブジェクト指向プログラミング)に基づいた実装
    */

    /**
     * Score用クラス
     */
    class Score {}

    /**
     * Foodロジック用クラス（要素はFoodsクラスから取得する）
     */
    class Food {
        constructor(public element: HTMLDivElement) {
            element.addEventListener(
                'click',
                this.clickEventHandler.bind(this), //bind():clickEventHandlerのthisはelementではなくFoodクラスだと宣言してる
            );
        }
        clickEventHandler() {
            this.element.classList.toggle('food--active');
        }
    }

    /**
     * Food要素の取得用クラス
     */
    class Foods {
        elements = document.querySelectorAll<HTMLDivElement>('.food');
        constructor() {
            this.elements.forEach((element) => {
                new Food(element);
            });
        }
    }
    const foods = new Foods();
}
