let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let size = Math.min(window.innerWidth, window.innerHeight) * 0.95;
canvas.width = size;
canvas.height = size;

window.addEventListener('resize', function(){
	size = Math.min(window.innerWidth, window.innerHeight) * 0.95;
    canvas.width = size;
    canvas.height = size;
})

squareCount = 8;
lineWidth = 2;

sizeSliderElement = document.getElementById("sizeSlider");
sizeInputElement = document.getElementById("sizeInput");

onlyLettersCheckboxElement = document.getElementById("onlyLettersCheckbox");
excludeOuterCheckboxElement = document.getElementById("excludeOuterCheckbox");

let selected = {
    x: -1,
    y: -1
}

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function setSize(v) {
    sizeSliderElement.value = v;
    sizeInputElement.value = v;
    squareCount = v;
}

function getRandom() {
    let eo = excludeOuterCheckbox.checked;
    let min = eo ? 1: 0;
    let max = eo ? squareCount - 1: squareCount;
    let span  = max - min;
    selected.x = Math.floor(Math.random() * span + min);
    selected.y = Math.floor(Math.random() * span + min);
}

let mouse = {
    x: 0,
    y: 0,
    down: false
}

mouseCorrected = {
	get x() {
		let canvasRect = canvas.getBoundingClientRect();
		let x = mouse.x - canvasRect.x;
		return x;
	},
	get y() {
        let canvasRect = canvas.getBoundingClientRect();
		let y = mouse.y - canvasRect.y;
		return y;
	}
};

window.addEventListener("mousemove", function(e){
    mouse.x = e.x,
    mouse.y = e.y
});

window.addEventListener('mousedown', function(e) {
    mouse.down = true;
});

window.addEventListener('mouseup', function(e) {
    mouse.down = false;
});

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    squareCount = sizeSliderElement.value * 1;

    squareSize = (canvas.width - lineWidth) / squareCount;
    for(let x = 0; x < squareCount; x += 1) {
        for(let y = 0; y < squareCount; y += 1) {
            let x1 = x * squareSize + lineWidth;
            let y1 = y * squareSize + lineWidth;
            let sz = squareSize - lineWidth

            mx = mouseCorrected.x;
            my = mouseCorrected.y;

            let color = "black";
            if (mx > x1 && mx < x1 + sz && my > y1 & my < y1 + sz) {
                color = "rgba(0,0,0,0.8)";
                if (mouse.down) {
                    selected.x = x;
                    selected.y = y;
                }
            } 
            let sel = selected.x == x && selected.y == y
            if (sel) 
                color = "rgba(0,0,0,0.5)";

            ctx.fillStyle = color;
            ctx.fillRect(x1, y1, sz, sz);

            ol = onlyLettersCheckboxElement.checked;

            if (sel) {
                ctx.fillStyle = "white";
                fontSize = Math.min(30, squareSize / 2)
                ctx.font = fontSize + "px Arial";
                let text = letters[selected.x];
                if (ol) {
                    //use the letters I to P for all maps smaller than or equal to 8x8 because PUBG does it like that.
                    text += letters[selected.y + Math.max(squareCount, 8)];
                } else {
                    text += (selected.y + 1);
                }
                ctx.fillText(text, x1 + squareSize * 0.1, y1 + sz - squareSize * 0.1)
            }
        }    
    }

    window.requestAnimationFrame(draw);
}

draw();