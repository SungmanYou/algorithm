'use strict';

load()
    .then((MOVIE_DATA) => {
	console.log('Initialized Movie Data');
	console.log(MOVIE_DATA);
	return init(MOVIE_DATA);
    })
    .then((graph) => {
	let start = graph.setStart('Edward Norton');
	let end = graph.setEnd('Kevin Bacon');
	console.log('START');
	console.log(start);
	console.log('END');
	console.log(end);
	search(start, end);
    });


function init(MOVIE_DATA) {
    return new Promise((resolve, reject) => {
	let graph = new Graph();
	MOVIE_DATA.forEach((movie, i, arr) => {
	    let movieNode = new Node({
		id: movie.id,
		title: movie.title,
		poster: movie.poster
	    });
	    graph.addNode(movieNode);
	    
	    movie.cast.forEach((person, j, arr) => {
		let personNode = graph.getNode(person);
		if (personNode === undefined) {
		    personNode = new Node({
			id: person.id,
			name: person.name,
			profile: person.profile
		    });
		}
		graph.addNode(personNode);
		movieNode.addEdge(personNode);
	    });
	});
	resolve(graph);
    });
}

function search(start, end) {
    let queue = [];
    
    start.searched = true;
    queue.push(start);

    while (queue.length > 0) {
    	let current = queue.shift();
	if (current.value.name === end.value.name) {
    	    console.log(`Found!! Check the parent nodes`);
	    console.log(current);
	    break;
    	}
	
	current.edges.forEach((neighbor, i, arr) => {
	    if (!neighbor.searched) {
    		neighbor.searched = true;
    		neighbor.parent = current;
    		queue.push(neighbor);
    	    }
	});
    }
}
