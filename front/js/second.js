(function () {
    const promoStartDate = new Date(Date.UTC(2022, 8, 26));
    const promoCheckpointsCnt = 10;
    const daysPerUpdate = 11;
    const promoCheckPointDates = computePromoCheckpointDates();
    let currentCheckpoint = getCurrentCheckpoint();

    const mainPage = document.querySelector('.fav__page');

    onCheckpointUpdate();

    function computePromoCheckpointDates() {
        const promoCheckpoints = [promoStartDate];
        for (let i = 1; i <= promoCheckpointsCnt; i++) {
            const nextCheckpoint = new Date(promoStartDate.getTime());
            nextCheckpoint.setDate(promoStartDate.getDate() + i * daysPerUpdate);
            promoCheckpoints.push(nextCheckpoint);
        }
        return promoCheckpoints;
    }

    function getCurrentCheckpoint() {
        const currentTimestamp =  Date.now();
        let checkpointNum = 0;
        while(currentTimestamp >= promoCheckPointDates[checkpointNum]) {
            checkpointNum++;
        }
        return checkpointNum;
    }

    function onCheckpointUpdate() {
        for (let i = 1; i <= promoCheckpointsCnt; i++) {
            mainPage.classList.remove(`car${i}`)
        }
        mainPage.classList.add(`car${currentCheckpoint}`)
    }

})();

const percent = document.querySelectorAll('.percetn');
const favPage = document.querySelector('.fav__page');
const autoMinNone = document.querySelectorAll('.auto-win');
const autoMinNone2 = document.querySelectorAll('.auto-win-2');

for(let i=0; i<autoMinNone.length; i++){
    if(favPage.classList.contains('car1')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone[1].classList.add('load');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        autoMinNone2[1].classList.add('load');
    }
    if(favPage.classList.contains('car2')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone[1].classList.add('done');
        autoMinNone[2].classList.add('load');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        autoMinNone2[1].classList.add('done');
        autoMinNone2[2].classList.add('load');
    }
    if(favPage.classList.contains('car3')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone[1].classList.add('done');
        autoMinNone[2].classList.add('done');
        autoMinNone[3].classList.add('load');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        autoMinNone2[1].classList.add('done');
        autoMinNone2[2].classList.add('done');
        autoMinNone2[3].classList.add('load');
    }
    if(favPage.classList.contains('car4')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone[1].classList.add('done');
        autoMinNone[2].classList.add('done');
        autoMinNone[3].classList.add('done');
        autoMinNone[4].classList.add('load');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        autoMinNone2[1].classList.add('done');
        autoMinNone2[2].classList.add('done');
        autoMinNone2[3].classList.add('done');
        autoMinNone2[4].classList.add('load');
    }
    if(favPage.classList.contains('car5')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        for(let i=1; i<=4; i++){
            autoMinNone[i].classList.add('done');
            autoMinNone2[i].classList.add('done');
        }
        autoMinNone[5].classList.add('load');
        autoMinNone2[5].classList.add('load');
    }
    if(favPage.classList.contains('car6')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        for(let i=1; i<=5; i++){
            autoMinNone[i].classList.add('done');
            autoMinNone2[i].classList.add('done');
        }
        autoMinNone[6].classList.add('load');
        autoMinNone2[6].classList.add('load');
    }
    if(favPage.classList.contains('car7')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        for(let i=1; i<=6; i++){
            autoMinNone[i].classList.add('done');
            autoMinNone2[i].classList.add('done');
        }
        autoMinNone[7].classList.add('load');
        autoMinNone2[7].classList.add('load');
    }
    if(favPage.classList.contains('car8')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        for(let i=1; i<=7; i++){
            autoMinNone[i].classList.add('done');
            autoMinNone2[i].classList.add('done');
        }
        autoMinNone[8].classList.add('load');
        autoMinNone2[8].classList.add('load');
    }
    if(favPage.classList.contains('car9')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        for(let i=1; i<=8; i++){
            autoMinNone[i].classList.add('done');
            autoMinNone2[i].classList.add('done');
        }
        autoMinNone[9].classList.add('load');
        autoMinNone2[9].classList.add('load');
    }
    if(favPage.classList.contains('car10')){
        autoMinNone[0].classList.remove('load');
        autoMinNone[0].classList.add('done');
        autoMinNone2[0].classList.remove('load');
        autoMinNone2[0].classList.add('done');
        for(let i=1; i<=9; i++){
            autoMinNone[i].classList.add('done');
            autoMinNone2[i].classList.add('done');
        }
    }
}

percent.forEach(item=>{
    if(favPage.classList.contains('car1')) item.innerHTML = '13%';
    if(favPage.classList.contains('car2')) item.innerHTML = '22%';
    if(favPage.classList.contains('car3')) item.innerHTML = '34%';
    if(favPage.classList.contains('car4')) item.innerHTML = '41%';
    if(favPage.classList.contains('car5')) item.innerHTML = '56%';
    if(favPage.classList.contains('car6')) item.innerHTML = '63%';
    if(favPage.classList.contains('car7')) item.innerHTML = '72%';
    if(favPage.classList.contains('car8')) item.innerHTML = '84%';
    if(favPage.classList.contains('car9')) {
        item.innerHTML = '92%'
        //тут перемещаем стрелочки влево, когда процент больше 88

        const arrowsProgress = document.querySelector('.buy__info-progress .myProgress .arrow-right')
        arrowsProgress.classList.add('_bigPercent');


    }
    if(favPage.classList.contains('car10')){
        item.innerHTML = '99%'
        const secondProgress = document.querySelector('.fav__page .buy__info-progress .myProgress')
        secondProgress.classList.add('_bigPercent');


    };


})