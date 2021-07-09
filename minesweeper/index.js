document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid');
    let width=10
    let squares=[]
    isGameOver=false;
    let bombCount=20
    let flags=0
    let flagsLeft=document.querySelector('#flags-left')
    const result=document.querySelector('#result')
    function createBoard(){
        flagsLeft.innerHTML = bombCount
        const bombsArray=Array(bombCount).fill('bomb')
        const emptyArray=Array(width*width-bombCount).fill('valid')
        const gameArray=emptyArray.concat(bombsArray)
        const shuufledGameArray=gameArray.sort(()=>Math.random()-0.5)
        // console.log(shuufledGameArray)
        for(let i=0;i<width*width;i++){
            const square=document.createElement('div')
            square.setAttribute('id',i)
            square.classList.add(shuufledGameArray[i])
            grid.appendChild(square)
            squares.push(square)
            square.addEventListener('click',(e)=>click(square))
            square.oncontextmenu=function(e){
                e.preventDefault()
                addFlag(square)
            }
        }

        for(let i=0;i<squares.length;i++){
            let total=0;
            const isLeftEdge=(i%width)==0;
            const isRightEdge=(i+1)%width==0;
            if(squares[i].classList.contains('valid')){
                if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++;
                if(i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++;
                if(i>10 && squares[i-width].classList.contains('bomb')) total++;
                if(i>11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++;
                if(i<99 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++;
                if(i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++;
                if(i<89 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++;
                if(i<90 && squares[i+width].classList.contains('bomb')) total++;
                squares[i].setAttribute('data',total)
            }
        }

    }
    createBoard()
    let addFlag=(square)=>{
        if(isGameOver) return;
        if(!square.classList.contains('checked') && flags<bombCount ){
            if(!square.classList.contains('flag')){
                square.classList.add("flag")
                square.innerHTML="🚩"
                flags+=1
                flagsLeft.innerHTML = bombCount- flags
                checkForWin()
            }
            else{
                square.classList.remove('flag')
                square.innerHTML="";
                flags-=1
                flagsLeft.innerHTML = bombCount- flags
            }
        }
    }
    let click=(square)=>{
        if(isGameOver) return;
        if(square.classList.contains('checked') || square.classList.contains('flag') ) return;
        if(square.classList.contains('bomb')) {
            gameOver(square)
        }
        else{
            let total=square.getAttribute('data')
            if(total!=0){
                square.innerHTML=total
                square.classList.add('checked')
                return;
            }
            check_square(square)
            square.classList.add('checked')
        }
    }
    function check_square(square){
        let currentId=parseInt(square.id);
        const isLeftEdge=(currentId%width)==0;
        const isRightEdge=(currentId+1)%width==0;
    
        setTimeout(()=>{
            if(currentId>0 && !isLeftEdge){
                let newId=currentId-1;
                const newSquare=document.getElementById(newId)
                click(newSquare)
                // console.log(newSquare)
            }
            if(currentId>9 && !isRightEdge ){
                const newId=currentId+1-width;
                const newSquare=document.getElementById(newId)
                click(newSquare)
            }
            if(currentId>10){
                const newId=currentId-width;
                const newSquare=document.getElementById(newId)
                click(newSquare)
            }
            if(currentId>11 && !isLeftEdge){
                const newId=currentId-1-width;
                const newSquare=document.getElementById(newId)
                click(newSquare)
            }
            if(currentId<99 && !isRightEdge){
                const newId=currentId+1;
                const newSquare=document.getElementById(newId)
                click(newSquare)
            }
            if(currentId<90 && !isLeftEdge){
                const newId=currentId-1+width;
                const newSquare=document.getElementById(newId)
                click(newSquare)
            }
            if(currentId<89 && !isRightEdge ){
                const newId=currentId+1+width;
                const newSquare=document.getElementById(newId)
                click(newSquare)
            }
            if(currentId<90){
                const newId=currentId+width;
                const newSquare=document.getElementById(newId)
                click(newSquare)
            }
        },10)
    }
    let gameOver=(square)=>{
        result.innerHTML = 'BOOM! Game Over!'
        isGameOver=true;
        squares.forEach(square=>{
            if(square.classList.contains('bomb')){
                square.innerHTML="💣"
            }
        })
    }

    let checkForWin=()=>{
        matches=0
        for(let i=0;i<squares.length;i++){
            if(squares[i].classList.contains('bomb') && squares[i].classList.contains('flag')){
                matches++;
            }
            if(matches===bombCount){
                result.innerHTML = 'YOU WIN!'
                isGameOver=true;
            }
        }
    }
})