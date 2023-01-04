/* 
* create star 
*/

// Utils
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const generateStar = () => {
    const bg = document.querySelector('.background') as HTMLDivElement | null;
    if (bg) {
        for (let i = 1; i < 125; i++){
            const star = document.createElement('div');
            star.classList.add('star');
            star.setAttribute('style', `--i: ${random(1,2)}px;`);
            bg.appendChild(star);
        }  
    }  
}

const placeStar = () => {
    const stars = document.querySelectorAll('.star') as NodeListOf<HTMLDivElement>;
    stars.forEach(star => {
        star.style.top = `${random(0, 100)}%`;
        star.style.left = `${random(0, 100)}%`;
    })
}

generateStar();
placeStar();

