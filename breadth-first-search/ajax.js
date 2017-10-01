

'use strict';

function load() {
    return new Promise((resolve, reject) => {
	let data = [];
	let promises = [];

	getMovieList().then((movieList) => {
	    movieList.forEach((movie, index, arr) => {
		promises.push(getCast(movie.id));
	    });
	    Promise.all(promises).then((castList) => {
		castList.forEach((cast, i, arr) => {
		    data.push({
			id: movieList[i].id,
			title: movieList[i].title,
			poster: movieList[i].poster,
			cast: cast
		    });
		});
		resolve(data);
	    });
	});
    });
}

function getMovieList() {
    return new Promise((resolve, reject) => {

	// Get list from remote API
	
	// let xhr = new XMLHttpRequest();
	// xhr.addEventListener('readystatechange', function () {
	//     if (this.readyState === this.DONE) {
	// 	let movieList = [];
	// 	JSON.parse(this.responseText).items.forEach((item, index, arr) => {
	// 	    console.log(this.responseText);
	// 	    movieList.push({
	// 		id: item.id,
	// 		title: item.title,
	// 		poster: item.poster_path
	// 	    });
	// 	});
	// 	resolve(movieList);
	//     }
	// });
	// xhr.open('GET', `https://api.themoviedb.org/3/list/34691?api_key=${KEY_V3}`);
	// xhr.send();

	// Get list from local sample json
	resolve(sample.items);
    });
}

function getCast(id) {
    return new Promise((resolve, reject) => {
	let xhr = new XMLHttpRequest();
	xhr.addEventListener('readystatechange', function () {
	    if (this.readyState === this.DONE) {
		let list = [];
		JSON.parse(this.responseText).cast.forEach((item, index, arr) => {
		    list.push({
			id: item.id,
			name: item.name,
			profile: item.profile_path
		    });
		});
		resolve(list);
	    }
	});
	xhr.open('GET', `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY_V3}`);
	xhr.send();
    });
}
