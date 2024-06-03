import { removeContents,loadContent,changeResultTitle } from "../Utilities/utils";
import initiatePagination from "../PageNavigation/pagination";

const handleGenre=(genre,getMoviesOrTvShows)=>{
    const moviesContainer=document.querySelector('.moviesList');
    const pagination=document.querySelector('.pagination');
    genre.addEventListener('click',()=>{
        removeContents(moviesContainer);
        loadContent(getMoviesOrTvShows(genre.value));
        changeResultTitle(genre.textContent);
        removeContents(pagination);
        initiatePagination(getMoviesOrTvShows(genre.value));
    }); 
}

const createGenres= async (container,getGenres,getMoviesOrTvShows)=>{
    const data= await getGenres();
    data.map(item=>{
     let genre=document.createElement('p');
     genre.textContent=item.name;
     genre.value=item.id;
     handleGenre(genre,getMoviesOrTvShows);
     container.appendChild(genre);
    });
}

export function fillContainersWith(getGenres,getContent){
    const containers=document.querySelectorAll('.optionsContainer, .optionsContainer2');
    containers.forEach(container=>createGenres(container,getGenres,getContent));
}

export const showGenres=()=>{
    const option=document.querySelector('.genres');
    const container=document.querySelector('.optionsContainer');
    option.addEventListener ('click',()=>{
        container.style.display='grid';
    });
    document.querySelector('main').addEventListener('click',()=>container.style.display='none');  
}

export const showHiddenGenres=()=>{
    const genres=document.querySelectorAll('.genres')[1];
    const menuOptions=document.querySelector('.optionsContainer2');
    const menu=document.querySelector('#secondMenu');
    genres.addEventListener('click',()=>{
        if(menuOptions.style.display==='none'){
            menuOptions.style.display='grid';
            menu.style.height='500px';
        }
        else{
            menuOptions.style.display='none';
            menu.style.height='200px';
        }
    });
}

