const main = document.querySelector(".container");

const gridSize = document.querySelector("#gridSize");

let isMouseDown = false;

function enableDrawing()
{
    document.addEventListener("mousedown", () => isMouseDown = true);
    document.addEventListener("mouseup", () => isMouseDown = false);

    const grids = document.querySelectorAll(".grids");

    grids.forEach( grid => {
        grid.addEventListener("mousedown", (e) => {
            grid.style.backgroundColor = "black";
        });

        grid.addEventListener("mouseover", () => {
            if(isMouseDown)
            {
                grid.style.backgroundColor = "black";
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
}

createGrid(gridSize.value);

gridSize.addEventListener("change", () => {
    createGrid(gridSize.value);
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

