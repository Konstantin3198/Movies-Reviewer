import { fillContainersWith,showGenres,showHiddenGenres } from "../Genres/gernes";
import initiatePagination from "../PageNavigation/pagination";
import { loadContent,removeContents,changeResultTitle } from "../Utilities/utils";
import { getSearchMovies,getMostPopularMovies,getMostPopularTvShows
    ,getMovieGenres,getTvShowGenres,getMoviesByGenres,getTvShowsByGenres} from "../Api/api";
import '../styles.css';
import '../Genres/genres.css';
import '../Movie/movie.css';
import '../PageNavigation/pagination.css';

const showHiddenMenu=()=>{
    const iconMenu=document.querySelector('.material-symbols-outlined');
    const menu=document.querySelector('#secondMenu');
    iconMenu.addEventListener('click',()=>{
        if(menu.classList.contains('hiddenSecondaryMenu')){
            menu.classList.remove('hiddenSecondaryMenu');
            menu.classList.add('secondaryMenu');
        }
        else{
           menu.classList.add('hiddenSecondaryMenu');
           menu.classList.remove('secondaryMenu');
        }
    });
}
                    
function searchForMovie(){
   const moviesList=document.querySelector('.moviesList');
   const pagination=document.querySelector('.pagination');
   const input=document.getElementById('search')
   let query='';
   input.addEventListener('change',(e)=>{
      query=e.target.value.replace(/[%$#@?*)(]/g," "); 
   });

   document.querySelector('.formSubmit').addEventListener('submit',(e)=>{
      if(query.length!==0){
        e.preventDefault();
        removeContents(moviesList);
        changeResultTitle(`Search results for ${query}`);
        loadContent(()=>getSearchMovies(query));
        removeContents(pagination);
        input.value='';
     }
   });
}

const moviesOrTvshows=(links,kind)=>{
    const moviesList=document.querySelector('.moviesList');
    const pagination=document.querySelector(".pagination");
    Array.from(links).forEach(item=>item.addEventListener('click',()=>{
        const containers=document.querySelectorAll(".optionsContainer, .optionsContainer2");
        removeContents(moviesList);
        changeResultTitle('Most Popular');
        containers.forEach(container=>removeContents(container));
        if(kind==='movie'){
            fillContainersWith(getMovieGenres,getMoviesByGenres);
            loadContent(getMostPopularMovies);
            removeContents(pagination);
            initiatePagination(getMostPopularMovies);
        }
        else{
            fillContainersWith(getTvShowGenres,getTvShowsByGenres);
            loadContent(getMostPopularTvShows);
            removeContents(pagination);
            initiatePagination(getMostPopularTvShows);
        }   
    })); 
}

const movies=document.querySelectorAll('.movies');
const tvshows=document.querySelectorAll('.tvshows');

window.addEventListener('load',()=>{
   loadContent(getMostPopularMovies);
   fillContainersWith(getMovieGenres,getMoviesByGenres);
   initiatePagination(getMostPopularMovies);
});

moviesOrTvshows(movies,'movie');
moviesOrTvshows(tvshows,'tvshow');

showGenres()
searchForMovie();
showHiddenMenu();
showHiddenGenres();
