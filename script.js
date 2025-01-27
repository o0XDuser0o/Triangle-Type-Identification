window.onload = () => {
    location.hash = 'eng'
}
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
    cur_language = location.hash
    if (side_1.trim() === "" || side_2.trim() === "" || side_3.trim() === ""){
        
        if(cur_language == "#eng") {
            document.getElementById("alert_text").textContent = "Please enter the sides length";
        }
        else if(cur_language == "#thai"){
            document.getElementById("alert_text").textContent = "กรุณากรอกให้ครบทั้ง 3 ด้าน";
        }

        document.getElementById("alert_text").style.visibility = "visible";
        return false;
    } else if (isNaN(side_1) || isNaN(side_2) || isNaN(side_3) || Number(side_1) <= 0 || Number(side_2) <= 0 || Number(side_3) <= 0){
        
        if(cur_language == "#eng") {
            document.getElementById("alert_text").textContent = "Please enter positive numbers only";
        }
        else if(cur_language == "#thai"){
            document.getElementById("alert_text").textContent = "กรุณากรอกจำนวนเต็มบวก";
        }

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
    cur_language = window.location.hash
    answer = {
        eng:{
            equal_tri: "Equilateral Triangle",
            iso_tri: "Isosceles Triangle",
            right_tri: "Right Triangle",
            scal_tri: "Scalene Triangle",
        },
        thai:{
            equal_tri: "สามเหลี่ยมด้านเท่า",
            iso_tri: "สามเหลี่ยมหน้าจั่ว",
            right_tri: "สามเหลี่ยมมุมฉาก",
            scal_tri: "สามเหลี่ยมด้านไม่เท่า",
        }
    }
    let equal_tri, iso_tri, right_tri, scal_tri
    if(cur_language == "#eng"){
        equal_tri = answer.eng.equal_tri
        iso_tri = answer.eng.iso_tri
        right_tri = answer.eng.right_tri
        scal_tri = answer.eng.scal_tri
    }
    else if(cur_language == "#thai"){
        console.log("check")
        equal_tri = answer.thai.equal_tri
        iso_tri = answer.thai.iso_tri
        right_tri = answer.thai.right_tri
        scal_tri = answer.thai.scal_tri
    }
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
        document.getElementById("output_text").textContent = equal_tri;
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
        document.getElementById("output_text").textContent = iso_tri;
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
        document.getElementById("output_text").textContent = right_tri;
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
        document.getElementById("output_text").textContent = scal_tri;
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
    cur_language = window.Location.hash

    document.getElementById("side_1_box").value = "";
    document.getElementById("side_2_box").value = "";
    document.getElementById("side_3_box").value = "";
    document.getElementById("alert_text").textContent = "Alert here";
    document.getElementById("alert_text").style.visibility = "hidden";
    
    if(cur_language == "#eng") {
        document.getElementById("output_text").textContent = "Please enter the sides length";
    }
    else if(cur_language == "#thai"){
        document.getElementById("output_text").textContent = "กรุณากรอกให้ครบทั้ง 3 ด้าน";
    }
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

let language = {
    eng: {
        popup_header: "How to use",
        info_header1: "Input Fields for Side Lengths:",
        info_header2: "Confirming the Input:",
        info_header3: "Resetting the Input Fields:",
        info_content1_1: `Side 1: The first input field is labeled "Side 1". Enter the length of the first side in the field to the right of the label.`,
        info_content1_2: `Side 2: The second input field is labeled "Side 2". Enter the length of the second side in the field to the right of the label.`,
        info_content1_3: `Side 3: The third input field is labeled "Side 3". Enter the length of the third side in the field to the right of the label.`,
        info_content2_1: `Below the input fields, there is an "Enter" button. Click this button to confirm your inputs and calculate the type of triangle based on the entered side lengths.`,
        info_content3_1: `Next to the "Enter" button, there is a "Reset" button. Use this to clear all the input fields and start over.`,
        switchlanguagebutton: `English -> Thai`,
        type_header: `Triangle Type Identification`,
        input_header: `Enter the length of sides`,
        side1: `Side 1`,
        side2: `Side 2`,
        side3: `Side 3`,
        enterbutton: `Enter`,
        resetbutton: `Reset`,
        result_header: `Result`,
        default_output_text: `Please enter the sides length`,
        equal_tri: "Equilateral Triangle",
        iso_tri: "Isosceles Triangle",
        right_tri: "Right Triangle",
        scal_tri: "Scalene Triangle",
        missing_alert_text: `Please fill in all input fields`,
    },
    thai: {
        popup_header: "วิธีการใช้งาน",
        info_header1: "ช่องกรอกความยาวด้าน:",
        info_header2: "ยืนยันการกรอกข้อมูล:",
        info_header3: "ล้างข้อมูลช่องกรอก:",
        info_content1_1: `Side 1: ช่องกรอกแรกมีข้อความกำกับว่า "ด้านที่ 1" ให้ใส่ความยาวของด้านแรกในช่องด้านขวาของข้อความ`,
        info_content1_2: `Side 2: ช่องกรอกที่สองมีข้อความกำกับว่า "ด้านที่ 2" ให้ใส่ความยาวของด้านที่สองในช่องด้านขวาของข้อความ`,
        info_content1_3: `Side 3: ช่องกรอกที่สามมีข้อความกำกับว่า "ด้านที่ 3" ให้ใส่ความยาวของด้านที่สามในช่องด้านขวาของข้อความ`,
        info_content2_1: `ด้านล่างช่องกรอก มีปุ่ม "Enter" ใช้สำหรับยืนยันค่าความยาวที่ป้อน และเริ่มการคำนวณประเภทของสามเหลี่ยม`,
        info_content3_1: `ถัดจากปุ่ม "Enter" จะมีปุ่ม "Reset" ใช้สำหรับลบข้อมูลทั้งหมดในช่องกรอกทั้งสาม`,
        switchlanguagebutton: `ไทย -> อังกฤษ`,
        type_header: `ระบุประเภทของสามเหลี่ยม`,
        input_header: `ใส่ความยาวในแต่ละด้าน`,
        side1: `ด้าน 1`,
        side2: `ด้าน 2`,
        side3: `ด้าน 3`,
        enterbutton: `คำณวน`,
        resetbutton: `ล้างข้อมูล`,
        result_header: `ผลลัพธ์`,
        default_output_text: `กรุณาใส่ความยาวของแต่ละด้าน`,
        equal_tri: "สามเหลี่ยมด้านเท่า",
        iso_tri: "สามเหลี่ยมหน้าจั่ว",
        right_tri: "สามเหลี่ยมมุมฉาก",
        scal_tri: "สามเหลี่ยมด้านไม่เท่า",
        missing_alert_text: `กรุณากรอกให้ครบทั้ง 3 ด้าน`,
    }
}

function switch_language(){
    
    if(window.location.hash == "#eng"){
        location.hash = "#thai"
    }
    else if (window.location.hash == "#thai"){
        location.hash = "#eng"
    }

    // Set the content of the webpage
    // depending on the hash value
    if (window.location.hash == "#eng") {
        popup_header.textContent = language.eng.popup_header
        info_header1.textContent = language.eng.info_header1
        info_header2.textContent = language.eng.info_header2
        info_header3.textContent = language.eng.info_header3
        info_content1_1.textContent = language.eng.info_content1_1
        info_content1_2.textContent = language.eng.info_content1_2
        info_content1_3.textContent = language.eng.info_content1_3
        info_content2_1.textContent = language.eng.info_content2_1
        info_content3_1.textContent = language.eng.info_content3_1
        switchlanguagebutton.textContent = language.eng.switchlanguagebutton
        type_header.textContent = language.eng.type_header
        input_header.textContent = language.eng.input_header
        side1.textContent = language.eng.side1
        side2.textContent = language.eng.side2
        side3.textContent = language.eng.side3
        enterbutton.textContent = language.eng.enterbutton
        resetbutton.textContent = language.eng.resetbutton
        result_header.textContent = language.eng.result_header

        if (alert_text.textContent == "กรุณากรอกให้ครบทั้ง 3 ด้าน"){
            alert_text.textContent = "Please fill in all input fields"
        }
        
        if (alert_text.textContent == "กรุณากรอกจำนวนเต็มบวก"){
            alert_text.textContent = "Please enter positive numbers only"
        }

        if (output_text.textContent == "กรุณาใส่ความยาวของแต่ละด้าน") {
            output_text.textContent = "Please enter the sides length"
        }
        if (output_text.textContent == "สามเหลี่ยมด้านเท่า"){
            output_text.textContent = "Equilateral Triangle"
        }
        else if (output_text.textContent == "สามเหลี่ยมหน้าจั่ว"){
            output_text.textContent = "Isosceles Triangle"
        }
        else if (output_text.textContent == "สามเหลี่ยมมุมฉาก"){
            output_text.textContent = "Right Triangle"
        }
        else if (output_text.textContent == "สามเหลี่ยมด้านไม่เท่า"){
            output_text.textContent = "Scalene Triangle"
        }

    
    }
    else if (window.location.hash == "#thai") {
        popup_header.textContent = language.thai.popup_header
        info_header1.textContent = language.thai.info_header1
        info_header2.textContent = language.thai.info_header2
        info_header3.textContent = language.thai.info_header3
        info_content1_1.textContent = language.thai.info_content1_1
        info_content1_2.textContent = language.thai.info_content1_2
        info_content1_3.textContent = language.thai.info_content1_3
        info_content2_1.textContent = language.thai.info_content2_1
        info_content3_1.textContent = language.thai.info_content3_1
        switchlanguagebutton.textContent = language.thai.switchlanguagebutton
        type_header.textContent = language.thai.type_header
        input_header.textContent = language.thai.input_header
        side1.textContent = language.thai.side1
        side2.textContent = language.thai.side2
        side3.textContent = language.thai.side3
        enterbutton.textContent = language.thai.enterbutton
        resetbutton.textContent = language.thai.resetbutton
        result_header.textContent = language.thai.result_header

        if (alert_text.textContent == "Please fill in all input fields"){
            alert_text.textContent = "กรุณากรอกให้ครบทั้ง 3 ด้าน"
        }

        if (alert_text.textContent == "Please enter positive numbers only"){
            alert_text.textContent = "กรุณากรอกจำนวนเต็มบวก"
        }

        if (output_text.textContent == "Please enter the sides length") {
            output_text.textContent = "กรุณาใส่ความยาวของแต่ละด้าน"
        }
        if (output_text.textContent == "Equilateral Triangle"){ 
            output_text.textContent = "สามเหลี่ยมด้านเท่า"
        }
        else if (output_text.textContent == "Isosceles Triangle"){
            output_text.textContent = "สามเหลี่ยมหน้าจั่ว" 
        }
        else if (output_text.textContent == "Right Triangle"){
            output_text.textContent = "สามเหลี่ยมมุมฉาก"
        }
        else if (output_text.textContent == "Scalene Triangle"){
            output_text.textContent = "สามเหลี่ยมด้านไม่เท่า"
        }
    }
}