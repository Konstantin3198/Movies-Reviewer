import createMovie from "../Movie/movie";

const loadContent=async (asyncFunction)=>{
    const {results,kind}=await asyncFunction();
    if(results){
        kind==='movie'?results.forEach(tvShow=>createMovie(tvShow,true)):(
            results.forEach(tvShow=>createMovie(tvShow,false))
        );
    }
}

const removeContents=(container)=>{
    while(container.hasChildNodes()){
        container.removeChild(container.firstChild);
    }
}

const changeResultTitle=(newTitle)=>{
    const results=document.querySelector('.results');
    results.textContent=newTitle;
}

 export {loadContent,removeContents,changeResultTitle};