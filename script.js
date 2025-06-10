const main = document.querySelector(".container");
const gridSize = document.querySelector("#gridSize");
const colorSelector = document.querySelector("#colorSelector");
const normal = document.querySelector(".normalMode");
const grayscale = document.querySelector(".grayScaleMode");
const rainbow = document.querySelector(".rainbowMode");
const sizeValue = document.querySelector(".size");

let isMouseDown = false;

let colorMode = "normalMode";
let baseColor = "black";
let darkness = 0;

function chooseColor()
{
    colorSelector.addEventListener("change", () => {
        baseColor = colorSelector.value;
    });
}

function chooseMode()
{
    normal.addEventListener("click", (e) => {
        colorMode = e.target.className;
    });

    grayscale.addEventListener("click", (e) => {
        colorMode = e.target.className;
    });

    rainbow.addEventListener("click", (e) => {
        colorMode = e.target.className;
    });
}

function startColor(grid)
{
    if(colorMode == "normalMode")
        grid.style.backgroundColor = `${baseColor}`;
    else if(colorMode == "rainbowMode")
    {
        let rand1 = Math.floor(Math.random() * 256);
        let rand2 = Math.floor(Math.random() * 256);
        let rand3 = Math.floor(Math.random() * 256);
        grid.style.backgroundColor = `rgb(${rand1},${rand2},${rand3})`;
    }
    else if(colorMode == "grayScaleMode")
    {
        let current = parseFloat(grid.dataset.darkness);
        if(current<1)
        {
            current = Math.min(1, current + 0.1); // Cap at 1
            grid.dataset.darkness = current.toFixed(1);
            grid.style.backgroundColor = `rgba(0,0,0,${current})`;
        }
    }
}

function enableDrawing()
{
    document.addEventListener("mousedown", () => isMouseDown = true);
    document.addEventListener("mouseup", () => isMouseDown = false);

    const grids = document.querySelectorAll(".grids");

    grids.forEach( grid => {
        grid.dataset.darkness = "0";

        grid.addEventListener("mousedown", (e) => {
            startColor(e.target);
        });

        grid.addEventListener("mouseover", (e) => {
            if(isMouseDown)
            {
                startColor(e.target);
            }
        });
    });
}

function createGrid(size){
    let gridDimensions = 512/size - 2 ;
    main.innerHTML = "";

    for(let i=0;i<size*size;i++)
    {
        const grid = document.createElement("div");
        grid.className = "grids";
        grid.style.border = "1px solid black";
        grid.style.height = `${gridDimensions}px`;
        grid.style.width = `${gridDimensions}px`;
        main.appendChild(grid);
    }

    enableDrawing();
    clearCanvas();
    chooseColor();
    chooseMode();    
}

createGrid(gridSize.value);

gridSize.addEventListener("change", () => {
    createGrid(gridSize.value);
    sizeValue.textContent = `${gridSize.value} X ${gridSize.value}`;
});


function clearCanvas()
{
    const clear = document.querySelector(".clear");
    
    clear.addEventListener("click", () => 
    {
        const grids = document.querySelectorAll(".grids");
        grids.forEach(grid => {
            grid.style.backgroundColor = "white";
        });
    });
}

