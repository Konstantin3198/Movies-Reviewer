const createImg=(imgUrl)=>{
    const baseUrl='https://image.tmdb.org/t/p/original';
    const movieImg=document.createElement('img');
    movieImg.src=`${baseUrl}/${imgUrl}`;
    movieImg.setAttribute('class','moviePoster');
    return movieImg;
}

const createTitle=(title)=>{
    const movieTitle=document.createElement('h3');
    movieTitle.textContent=title;
    movieTitle.setAttribute('class','movieTitle');
    return movieTitle;
}

const createSignage=(condition)=>{
    const signage=document.createElement('p');
    signage.textContent=(condition)?'Movie':'TV';
    signage.setAttribute('class','signage');
    return signage;
}

const createInfo=(year,votes)=>{
    const Year=document.createElement('p');
    const Votes=document.createElement('p');
    Year.textContent=year;
    Votes.innerHTML=`&#11088 ${votes.toFixed(1)}`;
    Year.setAttribute('class','releaseYear');
    Votes.setAttribute('class','movieVotes');
    return {Year,Votes};
}

const createOverview=(movieText)=>{
    const overview=document.createElement('p');
    overview.textContent=movieText;
    return overview;
}

export default function createMovie(movie,isMovie){
    const moviesList=document.querySelector('.moviesList');
    const movieContainer=document.createElement('div');
    movieContainer.setAttribute('class','movieContainer');

    const movieInfo=createInfo(isMovie?movie.release_date:movie.first_air_date,movie.vote_average);
    movieContainer.appendChild(createImg(movie.poster_path));
    movieContainer.appendChild(createTitle(isMovie?movie.title:movie.name));
    movieContainer.appendChild(createSignage(isMovie));

    Object.values(movieInfo).forEach(info=>movieContainer.appendChild(info));
    
    moviesList.appendChild(movieContainer);
} 
