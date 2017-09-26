'use strict';

let graph = new Graph();

for(let i = 0; i < SAMPLE_DATA.length; i++) {
    
    let groupNode = new Node(SAMPLE_DATA[i].group);
    graph.addNode(groupNode);

    let members =SAMPLE_DATA[i].members;
    for (let j = 0; j < members.length; j++) {
	let member = members[j];
	let memberNode = graph.getNode(member);

	if (memberNode === undefined) {
	    memberNode = new Node(member);
	}

	graph.addNode(memberNode);
	groupNode.addEdge(memberNode);
    }
}

console.log(graph);
