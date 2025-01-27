function submit() {
    let side_1 = document.getElementById("side_1_box").value;
    let side_2 = document.getElementById("side_2_box").value;
    let side_3 = document.getElementById("side_3_box").value;
    if (validation(side_1,side_2,side_3)){
        side_1 = Math.floor(Number(side_1)*100)/100;
        side_2 = Math.floor(Number(side_2)*100)/100;
        side_3 = Math.floor(Number(side_3)*100)/100;
        const triangle_type = identifier(side_1,side_2,side_3);
        output_display(triangle_type);
    }
}

function validation(side_1,side_2,side_3) {
    if (side_1.trim() === "" || side_2.trim() === "" || side_3.trim() === ""){
        document.getElementById("alert_text").textContent = "Please fill in all input fields";
        document.getElementById("alert_text").style.visibility = "visible";
        return false;
    } else if (isNaN(side_1) || isNaN(side_2) || isNaN(side_3) || Number(side_1) <= 0 || Number(side_2) <= 0 || Number(side_3) <= 0){
        document.getElementById("alert_text").textContent = "Please enter positive numbers only";
        document.getElementById("alert_text").style.visibility = "visible";
        return false;
    } else {
        document.getElementById("alert_text").textContent = "Alert here";
        document.getElementById("alert_text").style.visibility = "hidden";
        side_1 = Math.floor(Number(side_1)*100)/100;
        side_2 = Math.floor(Number(side_2)*100)/100;
        side_3 = Math.floor(Number(side_3)*100)/100;
        document.getElementById("side_1_box").value = side_1;
        document.getElementById("side_2_box").value = side_2;
        document.getElementById("side_3_box").value = side_3;
        console.log(side_1,side_2,side_3);

        if(
            side_1 + side_2 <= side_3 ||
            side_2 + side_3 <= side_1 ||
            side_3 + side_1 <= side_2 
        ){
            document.getElementById("alert_text").textContent = "Cannot form a triangle";
            document.getElementById("alert_text").style.visibility = "visible";
            return false;
        } else{
            return true;
        }
    }
}

function identifier(side_1,side_2,side_3) {
    if (
        side_1 === side_2 &&
        side_2 === side_3
    ){
        return "Equilateral Triangle"
    } else if (
        side_1 === side_2 ||
        side_2 === side_3 ||
        side_3 === side_1 
    ){
        return "Isosceles Triangle"
    } else if (
        Math.pow(side_1,2) + Math.pow(side_2,2) === Math.pow(side_3,2) ||
        Math.pow(side_2,2) + Math.pow(side_3,2) === Math.pow(side_1,2) ||
        Math.pow(side_3,2) + Math.pow(side_1,2) === Math.pow(side_2,2) 
    ){
        return "Right Triangle"
    } else {
        return "Scalene Triangle"
    }
}

function output_display(triangle_type) {
    const canvas = document.getElementById("triangleCanvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#A17856";
    ctx.fillStyle = "#FBFBFB";

    if (triangle_type === "Equilateral Triangle"){
        document.getElementById("output_text").textContent = "Equilateral Triangle";
        const topX = width / 2;
        const topY = height * 0.15; 
        const leftX = width * 0.1; 
        const leftY = height * 0.85; 
        const rightX = width * 0.9; 
        const rightY = height * 0.85; 

        ctx.moveTo(topX, topY);
        ctx.lineTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.lineTo(topX, topY);

    } else if (triangle_type === "Isosceles Triangle"){
        document.getElementById("output_text").textContent = "Isosceles Triangle";
        const topX = width / 2; 
        const topY = height * 0.1; 
        const leftX = width * 0.3; 
        const leftY = height * 0.9; 
        const rightX = width * 0.7; 
        const rightY = height * 0.9; 

        ctx.moveTo(topX, topY);
        ctx.lineTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.lineTo(topX, topY);

    } else if (triangle_type === "Right Triangle"){
        document.getElementById("output_text").textContent = "Right Triangle";
        const topX = width * 0.1; 
        const topY = height * 0.1; 
        const bottomX = width * 0.1; 
        const bottomY = height * 0.9;
        const rightX = width * 0.9; 
        const rightY = height * 0.9;

        ctx.moveTo(topX, topY);
        ctx.lineTo(bottomX, bottomY);
        ctx.lineTo(rightX, rightY);
        ctx.lineTo(topX, topY);

    } else if (triangle_type === "Scalene Triangle"){
        document.getElementById("output_text").textContent = "Scalene Triangle";
        const topX = width * 0.2; 
        const topY = height * 0.1; 
        const middleX = width * 0.8; 
        const middleY = height * 0.9; 
        const bottomX = width * 0.4; 
        const bottomY = height * 0.7; 

        ctx.moveTo(topX, topY);
        ctx.lineTo(middleX, middleY);
        ctx.lineTo(bottomX, bottomY);
        ctx.lineTo(topX, topY);
    }

    ctx.stroke();
    ctx.fill();
}

function reset(){
    document.getElementById("side_1_box").value = "";
    document.getElementById("side_2_box").value = "";
    document.getElementById("side_3_box").value = "";
    document.getElementById("alert_text").textContent = "Alert here";
    document.getElementById("alert_text").style.visibility = "hidden";
    document.getElementById("output_text").textContent = "Please enter the sides length";
    const canvas = document.getElementById("triangleCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function show_doc(){
    document.getElementById("popupOverlay").classList.remove("hidden");
}

function close_doc(){
    document.getElementById("popupOverlay").classList.add("hidden");
}