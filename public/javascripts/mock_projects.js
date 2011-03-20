
var mock_projects = new Array();

// create some mock json objects
function generate_mock_project(index, priority) {
	var prj = {"name":"Project - " + index, 
			   "priority":priority,
			   "num_tasks":Math.floor(Math.random()*51), 
			   "id":index};
	return prj;
}

function init_projects() {
	for(var i=1;i<=10;i++) {
		if(i%3 == 0) {
			mock_projects.push(generate_mock_project(i, "low"));
		} else if(i%2 == 0){
			mock_projects.push(generate_mock_project(i, "medium"));
		} else {
			mock_projects.push(generate_mock_project(i, "high"));
		}
		
	}
}

function create_project_tile(prj) {
	var project_tile = document.createElement("div");
    project_tile.setAttribute("class", "tile");
	project_tile.setAttribute("id", "project-" + prj["id"]);
	
	var dimensions = compute_tile_size(prj);
	project_tile.style.width = "" + dimensions[0] + "px";
	project_tile.style.height = "" + dimensions[1] + "px";
	
	update_tile_color(prj, project_tile);
	
	var project_title = document.createElement("h1");
	project_title.innerHTML = prj["name"];
	
	project_tile.appendChild(project_title);
	
	return project_tile;
}

function update_tile_color(prj, div) {
	if(prj["priority"] == "high") {
		div.style.backgroundColor = "#33CC33";
		div.style.border = "1px solid #339900";	
	} else if(prj["priority"] == "medium") {
		div.style.backgroundColor = "#FF7640";
		div.style.border = "1px solid #FF4900";
	} else {
		div.style.backgroundColor = "#CCCCCC";
		div.style.border = "1px solid #669966";
	}
}

/* Returns [width, height] */
function compute_tile_size(prj) {
	// set base dimensions based on priority
	var min_width = 100;
	var min_height = 100;
	if(prj["priority"] == "high") {
		min_height = 200;
		min_width = 200;
	} else if(prj["priority"] == "medium") {
		min_height = 150;
		min_width = 150;
	} 
	
	// increase size proportional to number of tasks
	if(prj["num_tasks"] > 0) {
		min_width += 2*prj["num_tasks"];
		min_height += 2*prj["num_tasks"];
	}
	
	// TODO: increase size relative to number of overdue tasks

	return [min_width, min_height];
}

function draw_tiles() {
	$('.tile').remove();
	for(var i = 0; i < mock_projects.size(); i++) {
		var tile = create_project_tile(mock_projects[i]);
		$('#canvas').append(tile);
	}
}

function init() {
	init_projects();
	draw_tiles();
}