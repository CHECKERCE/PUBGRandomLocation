let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let size = Math.min(window.innerWidth, window.innerHeight) * 0.95;
canvas.width = size;
canvas.height = size;

squareCount = 8;
lineWidth = 2;

sizeSliderElement = document.getElementById("sizeSlider");
sizeInputElement = document.getElementById("sizeInput");
onlyLettersCheckboxElement = document.getElementById("onlyLettersCheckbox");

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
    selected.x = Math.floor(Math.random() * squareCount);
    selected.y = Math.floor(Math.random() * squareCount);
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
                ctx.font = "30px Arial";
                let text = letters[selected.x];
                if (ol) {
                    text += letters[selected.y + squareCount];
                } else {
                    text += (selected.y + 1);
                }
                ctx.fillText(text, x1 + 10, y1 + sz - 10)
            }
        }    
    }

    window.requestAnimationFrame(draw);
}

draw();