const ps = document.querySelector("#primary-screen");
const ss = document.querySelector("#secondary-screen");
const btns = document.querySelectorAll(".calculator__buttons button")
let cache;

function showOnScreen(char){
    if(char === "." && ps.innerHTML.includes(".")){
        return;
    }
    ps.innerHTML += char;
}

function makeCount(op){
    let valuePs = +ps.innerHTML;
    let valueSs = +ss.innerHTML;

    if(cache == undefined){
        cache = valuePs;
        updateScreen(op)
    }else if(valuePs == ""){
        ss.innerHTML = ss.innerHTML.slice(0, -1) + op;
    }else{
        const signal = ss.innerHTML.split(" ")[1];
        checkOperator(signal)
        updateScreen(op)
    }
}

function updateScreen(op){
    ss.innerHTML = `${cache} ${op}`;
    ps.innerHTML = "";
}

function showResult(){
    let valuePs = +ps.innerHTML;
    let valueSs = +ss.innerHTML;
    if(valuePs !== "" && valueSs == ""){
        return;
    }
    const op = ss.innerHTML.split(" ")[1];
    checkOperator(op)
    ss.innerHTML = ""
    if(cache % 1 != 0 && !isNaN(cache % 1)){
        const value = cache.toString()
        const regex = /\d+[.]\d{6,}/
        regex.test(value) ? ps.innerHTML = cache.toFixed(6) : ps.innerHTML = cache;
    }else{
        ps.innerHTML = cache;
    }
    cache = undefined;
}

function checkOperator(op){
    let valuePs = +ps.innerHTML;
    let valueSs = +ss.innerHTML.split(" ")[0];

    switch(op){
        case "+":
            cache = valuePs + valueSs;
            break;
        case "-":
            cache = valueSs - valuePs;
            break;
        case "*":
            cache = valuePs * valueSs;
            break;
        case "/":
            cache = valueSs / valuePs;
            break;
    }
}

function cleanLast(){
    ps.innerHTML = ps.innerHTML.slice(0, -1);
}

function cleanEntry(){
    ps.innerHTML = "";
}

function cleanAll(){
    ps.innerHTML = "";
    ss.innerHTML = "";
    cache = undefined;
}

btns.forEach(btn => {
    btn.addEventListener("click", e =>{
        const char = e.target.value;
        const signals = ["+", "-", "*", "/"]

        if(char >= 0 || char === "."){
            showOnScreen(char);
        }else if(signals.includes(char)){
            makeCount(char);
        }else if(char == "="){
            showResult();
        }else{
            switch(char){
                case "DEL":
                    cleanLast();
                    break;
                case "CE":
                    cleanEntry();
                    break;
                case "C":
                    cleanAll();
                    break;
            }
        }
    });
});