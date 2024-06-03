import { loadContent,removeContents } from "../Utilities/utils";

const createPageItem=(content)=>{
    const pageItem=document.createElement('li');
    pageItem.setAttribute('class','page-item');
    pageItem.innerHTML=`<a href=# class='page-link'>${content}</a>`;
    return pageItem;   
}

const createPagination=()=>{
    const pagination=document.querySelector('.pagination');
    const symbols=['<<','<','>','>>'];
    const upperLimit=20;
    symbols.slice(0,2).forEach(symbol=>pagination.appendChild(createPageItem(symbol)));
    for(let i=1;i<=upperLimit;++i){
       pagination.appendChild(createPageItem(i));
    }
    symbols.slice(2,symbols.length).forEach(symbol=>pagination.appendChild(createPageItem(symbol)));
}

function showSymbols(state1,state2){
    const pageItems=Array.from(document.querySelectorAll('.page-item'));
    pageItems.slice(0,2).forEach(pageItem=>pageItem.style.display=state1);
    pageItems.slice(pageItems.length-2,pageItems.length).forEach(pageItem=>pageItem.style.display=state2);
}

function showNumbers(start,end){
    const pageItems=Array.from(document.querySelectorAll('.page-item'));
    pageItems.slice(2,start+1).forEach(pageItem=>pageItem.style.display='none');
    pageItems.slice(start+1,end+2).forEach(pageItem=>pageItem.style.display='flex');
    pageItems.slice(end+2,pageItems.length-2).forEach(pageItem=>pageItem.style.display='none');
}


const bookmark=(function(){
    const pageItems=Array.from(document.querySelectorAll('.page-item'));
    let page=1;
    return function(symbol){
       switch(symbol){
        case '>':
            ++page;
            page<18?showSymbols('flex','flex'):showSymbols('flex','none');
            showNumbers(page,page+2);
            break;
        case '>>':
            page=18;
            showSymbols('flex','none');
            showNumbers(page,page+2);
            break;
        case '<':
            --page;
            page===1?showSymbols('none','flex'):showSymbols('flex','flex');
            showNumbers(page,page+2);
            break;
        case '<<':
            page=1;
            showSymbols('none','flex');
            showNumbers(page,page+2);
            break;
        default:
            page=symbol;
            break;
       }
       return page;
    }
    
}());

const flipPage=(asyncFunction)=>{
   const pageItems=document.querySelectorAll('.page-item');
   const moviesList=document.querySelector('.moviesList');
   for(let pageItem of pageItems){
       pageItem.addEventListener('click',()=>{
          removeContents(moviesList);
          loadContent(()=>asyncFunction(bookmark(pageItem.textContent)));
       });
    }
}

export default function initiatePagination(asyncFunction){
    createPagination();
    showSymbols('none','flex'); 
    showNumbers(1,3);
    flipPage(asyncFunction);
}



