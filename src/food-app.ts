export default function foodApp() {
    // OOPに基づいた実装を学ぶ
    class Score {}

    class Food {
        constructor(public element: HTMLDivElement) {
            element.addEventListener(
                'click',
                this.clickEventHandler.bind(this), //これがないとclickEventHandlerのthisはFoodクラスではなくelementを取得してしまう
            );
        }
        clickEventHandler() {
            this.element.classList.toggle('food--active');
        }
    }

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
