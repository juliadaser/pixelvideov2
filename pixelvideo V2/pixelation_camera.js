// FOR API
var ipadress;
var coordinates;
let country;

let pixel_amount_left;
let pixel_amount_right;
let shapeMove = false;
let d = 0;

// creating user selection
let sel;
let selected_country = "select country";

// JSON file with Media Autonomy Index
let data;
let media_autonomy_right;
let media_autonomy_left;
let skip_amount_right = 1;

let user_selected_something = false;

let strokecolor = "red"

function pixelate_video() {

    noStroke()
    sel.changed(mySelectEvent);
    video.loadPixels();


    for (let i = 0; i < 163; i++) {
        if (country == data[i].Country_EN) {
            media_autonomy_left = data[i]["Political Context"];
        }
    }

    pixel_amount_left = map(int(media_autonomy_left), 22, 100, 0, 300);
    let skip_amount_left = floor((windowHeight / pixel_amount_left))


    // checking if user has selected a country from the list yet
    if (selected_country != "select country") {
        for (let i = 0; i < 163; i++) {
            if (selected_country == data[i].Country_EN) {
                media_autonomy_right = data[i]["Political Context"];
            }
        }

        pixel_amount_right = map(int(media_autonomy_right), 22, 100, 0, 300);
        skip_amount_right = floor(windowHeight / pixel_amount_right);

    } else {
        // if the user has not selected any country, then just show them the camera 

        scalefactor = Math.max(windowWidth / video.width, windowHeight / video.height);
        let videoWidth = video.width * scalefactor;
        let videoHeight = video.height * scalefactor;
        let videoX = (windowWidth - videoWidth) / 2;
        let videoY = (windowHeight - videoHeight) / 2;

        let new_video = image(video, -videoX - videoWidth, videoY, videoWidth, videoHeight);

        push();
        scale(-1, 1);
        image(video, -videoX - videoWidth, videoY, videoWidth, videoHeight);
        pop();
    }

    // RIGHT SIDE - this is technically on the whole screen but is overlayed by the right side - thus must be in front of right side. 
    if (selected_country != "select country") { // means the user has selected something
        for (let x = 0; x < windowWidth; x += skip_amount_right) {
            for (let y = 0; y < windowHeight; y += skip_amount_right) {

                //this is the index of the array
                let pindex = ((windowWidth - x) + (y * video.width)) * 4;
                let r = video.pixels[pindex + 0];
                let g = video.pixels[pindex + 1];
                let b = video.pixels[pindex + 2];

                fill(r, g, b);
                rect(x, y, windowWidth / pixel_amount_right, windowHeight / pixel_amount_right);
            }
        }
    }

    // LEFT SIDE
    for (let x = line_x; x > 0; x -= skip_amount_left) {
        for (let y = 0; y < windowHeight; y += skip_amount_left) {

            //this is the index of the array
            let pindex = ((windowWidth - x) + (y * video.width)) * 4;
            //this is the rbg value inside the index        
            let r = video.pixels[pindex + 0];
            let g = video.pixels[pindex + 1];
            let b = video.pixels[pindex + 2];

            fill(r, g, b);
            rect(x, y, windowWidth / pixel_amount_left, windowHeight / pixel_amount_left);
        }
    }
    updatePixels();

    // drawing the border between the different sides of the canvases
    push()
    stroke(strokecolor)
    strokeWeight(10)
    line(line_x, 0, line_x, windowHeight)
    pop()

    fill("red")
    textSize(40)
    text("live location", 50, 100)
    text(country, 50, 150)

    text("compared to", windowWidth - 300, 100)
    text(selected_country, windowWidth - 300, 150)
}

function mousePressed() {
    d = mouseX - line_x
    if (d > -50 && d < 50) {
        shapeMove = true;
    } else {
        shapeMove = false;
        strokecolor = "red"
    }
}

function mouseReleased() {
    shapeMove = false
}

function mouseDragged() {
    if (shapeMove) {
        strokecolor = "blue"
        line_x = mouseX;
    }

    // stops line at borders
    if (line_x > windowWidth - 300) {
        line_x = windowWidth - 301
    }
    if (line_x < 300) {
        line_x = 301
    }
}

function mySelectEvent() {
    selected_country = sel.value();
}