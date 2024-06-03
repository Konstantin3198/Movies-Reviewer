const baseUrl='https://api.themoviedb.org/3';
const apiKey='81bd2136442881a634a259026d1b1fef';
const headerKey='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWJkMjEzNjQ0Mjg4MWE2MzRhMjU5MDI2ZDFiMWZlZiIsInN1YiI6IjY1OTY2N2RiZDdhNzBhMTJmZjY5NzM1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gaS4KLhg1sT3de6b69DxIGCJI_kzRMQ7JTgEOrhe2vI';
const endpoint=`api_key=${apiKey}`;


const getMovieGenres= async ()=>{
  try{
    const response= await fetch(`${baseUrl}/genre/movie/list?language=en&${endpoint}`);
    if(response.status===200){
      const data= await response.json();
      return data.genres;
      }
    else{
      throw new Error(response.status);
    }
  }
  catch(e){console.log(e);}   
}

const getTvShowGenres= async ()=>{
  try{
    const response=await fetch(`${baseUrl}/genre/tv/list?language=en&${endpoint}`);
    if(response.ok){
      const json= await response.json();
      return json.genres;
    }
    else{throw new Error(response.status);}
  }
  catch(e){console.log(e);}
}

const getMoviesByGenres=(genreId)=>async(page=1)=>{
  try{
    const response= await fetch(`${baseUrl}/discover/movie?with_genres=${genreId}&page=${page}`,{
     method:'GET',
     headers:{
      accept:'application/json',
      Authorization:`Bearer ${headerKey}`
      }
     });
    if(response.ok){
      const data= await response.json();
      return {results:data.results,kind:'movie'};
    }
    else{
      throw new Error(response.status);
    }
  }
  catch(e){console.log(e);}  
}


const getTvShowsByGenres= (genreId)=>async (page=1)=>{
  try{
    const response= await fetch(`${baseUrl}/discover/tv?with_genres=${genreId}&page=${page}`,{
      method:'GET',
      headers:{
        accept:'application/json',
        Authorization:`Bearer ${headerKey}`
      }
    });
    if(response.ok){
      const data= await response.json();
      return {results:data.results,kind:'tvshow'};
    } 
      else{throw new Error(response.status);}
  }
  catch(e){console.log(e);}
}


const getMostPopularMovies=async (page=1)=>{
  try{
    const response= await fetch(`${baseUrl}/movie/popular?page=${page}&${endpoint}`);
    if(response.ok){
      const json=await response.json();
      return {results:json.results,kind:'movie'};
    }
    else{
      throw new Error(response.status);
    }
  }
  catch(e){console.log(e);}
}

const getMostPopularTvShows= async(page=1)=>{
  try{
   const response=await fetch(`${baseUrl}/tv/popular?language=en-US&page=${page}&${endpoint}`);
   if(response.status===200){
     const data= await response.json();
     return {results:data.results,kind:'tvshow'};
   }
   else{throw new Error(response.status);}
 }
 catch(e){console.log(e);}
}

const getSearchMovies= async(value)=>{
  try{
    const response= await fetch(`${baseUrl}/search/movie?query=${value}&include_adult=false&language=en-US`,{
      method:'GET',
      headers:{
        accept:'application/json',
        Authorization:`Bearer ${headerKey}`
      } 
    });
    if(response.ok){
      const json= await response.json();
      return {results:json.results,kind:'movie'};
    }
    else{throw new Error('Movies not found');}
  }
  catch(e){console.log(e);}
}

export {getMovieGenres,getTvShowGenres
  ,getMostPopularMovies,getMostPopularTvShows
  ,getMoviesByGenres,getTvShowsByGenres
  ,getSearchMovies
};