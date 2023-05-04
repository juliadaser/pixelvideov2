let video;
let scalefactor;


let SceneNum = 2;

let line_x;


function preload() {
  let getting_ip_adress = "https://api.ipify.org?format=json";
  loadJSON(getting_ip_adress, gotData_one);
  data = loadJSON("2022_data.json");
}

function gotData_one(data) {
  ipadress = data.ip;
}

function gotData_two(data) {
  all_information = data;
  country = data.country_name;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // getting the user's coordinates by passing in the IP Adress into the Query String of another API Adress
  let url = "https://json.geoiplookup.io/";
  let getting_coordinates = url.concat(ipadress);
  loadJSON(getting_coordinates, gotData_two);

  sel = createSelect();
  sel.position(windowWidth - 300, 200);

  // creating an option in the menu for each country
  for (let i = 0; i < 163; i++) {
    sel.option(str(data[i].Country_EN))
  }
  line_x = windowWidth / 2;
}

function draw() {
  // image(video, 0, 0);
  pixelate_video();
  // let old_width = windowWidth;
  // if (old_width != windowWidth) {
  //   windowResized();
  // }
}

// making window resizable during experience
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  line_x = windowWidth / 2;
}