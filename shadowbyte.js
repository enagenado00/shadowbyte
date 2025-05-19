/*Timer: Countdown 15 min after that trigegrs function time over*/
let countdown;
let duration;
let isPaused = false;
const timeDisplay = document.querySelector("#timer");
const textDisplay = document.querySelector("#textDisplay");
const bgPlayer = document.querySelector("#bgPlayer");
// Add event listener for mousemove

/*App render html*/

const shadowByteApp = ` 
    <audio id="bgPlayer"loop controls autoplay="true" volume="0.5" >
        <source src="https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/bg.mp3" type="audio/mp3">
        Your browser does not support the audio element.
    </audio> 
`;       

document.querySelector('#app').innerHTML = shadowByteApp;

// Function to play sound on mouse move
    function playSoundOnMouseMove() {
      if (!bgPlayer.play()) {
        console.log(bgPlayer)
        bgPlayer.play().catch(error => console.error('Audio playback failed:', error));
      }    
      bgPlayer.muted = false;      
    }

document.addEventListener('mousemove', playSoundOnMouseMove);


/*Audio*/
const bgMusic = new Audio("https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/bg.mp3");
/*bgMusic.play();*/
const startAudio = new Audio("https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/start_01.mp3");
/*startAudio.play()*/
const errorAudio = new Audio("https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/error_01.mp3");
const incompleteAudio = new Audio("https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/incomplete_01.mp3");
const gameOverAudio = new Audio("https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/gameover_01.mp3");
const winAudio = new Audio("https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/win_01.mp3");

function startTimer(duration, timeDisplay) {
    let timer = duration, hours, minutes, seconds;
    countdown = setInterval(()=>{
        /*Timer must be called before calculate H:M:S*/
        if (!isPaused) {
            duration--;
            if (--timer < 0){
                timer = duration;
                console.log(timer + " " + duration)
            }
        }
        /*
        if (--timer < 0){
            timer = duration;
            console.log(timer + " " + duration)
        }*/        
        
        hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
        seconds = timer % 60;        
        
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;        
        
        timeDisplay.textContent = hours +":"+minutes+":"+seconds;
                
        /*Time over Display message game over*/
        if (timer <= 0) {
        clearInterval(countdown);
        console.log("time over");
        stageLoader.innerHTML = stageGameOver;
        textDisplay.textContent = "El tiempo se ha terminado, ShadowByte se ha apoderado de los servidores";
        gameOverAudio.play();  
        textDisplay.classList.add("text-danger");
        }          
    },1000)    
}

/**/
const startGame = () => {
    clearInterval(countdown);
    textDisplay.classList.remove("text-danger")
    textDisplay.classList.remove("text-win")
    timeDisplay.classList.add("text-danger")
    textDisplay.textContent = "Tiempo restante para hackeo de servidores"    
    duration = 8 * 60; // minutes in seconds 
    startTimer(duration, timeDisplay);
    stageLoader.innerHTML = stageOne;
    startAudio.play()
    if (!bgPlayer.play()) {
        bgPlayer.play();
    }
}

const reStartGame = () => {
    clearInterval(countdown);
    console.log("Time length of "+ duration)
    textDisplay.classList.remove("text-danger")
    textDisplay.classList.remove("text-win")
    timeDisplay.textContent = "";
    textDisplay.textContent = ""    
    resetTimer(duration, timeDisplay);
    startAudio.play()
    stageLoader.innerHTML = stageZero;    
}

function pauseTimer() {
    if (!isPaused) {
        isPaused = true;
        console.log("Paused at "+ timer)
    }    
}

function resetTimer() {
    clearInterval(countdown);
    //duration = 3600; // Reset to 1 hour
    startTimer(duration, timeDisplay);
    isPaused = false;
    console.log("Reset")
}

/*Stage loader*/
const stageLoader = document.querySelector("#stage");
/*Phase zero: Displays the context of the scape room*/

const stageZero = `
                    <div class="row">
                        <div class="col-md-12 position-relative">
                            <h1 class="text-center text-danger">ALERTA CIBER ATAQUE EN PROCESO</h1>
                            <video autoplay loop width="100%" height="auto" style="aspect-ratio: 16/9;">
                                <source src="https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/ShadowByte-1.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="w-100 p-4 text-center" style="background: rgba(0,0,0,.8)">
                                <p>Vaya, vaya, vaya… miren quien decidió aparecer, esperaba su visita agentes, pero ciertamente llegan tarde. Ya me encuentro en la última fase del hackeo de sus sistemas, si creen que pueden detenerme los invito a intentarlo. Por supuesto su tiempo será limitado así aprenderán que no respetar el tiempo de los demás es descortés.</p>
                                <input id="A0" type="submit" onclick="startGame()" value="Iniciar" class="btn btn-info my-2">
                            </div> 
                        </div>
                    </div>              
                    `

stageLoader.innerHTML = stageZero; 

/*Phase one: Displays a form with 5 questions, validates correct answers if correct goes to next stage else if its game over*/

const stageOne =  `  <div class="row">
                        <div class="col-md-6">
                            <img src="https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/ShadowByte-04.jpg" class="img-fluid">
                            <p class="text-center">Las respuestas están a su alrededor.</p>
                        </div>
                        <div class="col-md-6">                            
                            <form name="formOne" onsubmit="validateFormOne(); return false;" method="get">
                                <label style="display:none;">Soy la respuesta <b>NÚMERO UNO</b>, no lo dudes jamás, en mi nombre está la clave, búscala y la hallarás. Soy un ángel con cola, una excelente compañía mira bien de cerca para continuar tu travesía.</label> 
                                <input type="text" name="Q1" class="form-control mb-5" placeholder="Pregunta 1">

                                <label style="display:none;">
                                El color de la sangre cubre todo mi esplendor, y soy el único diferente, es el color del amor. dentro de mi encontrarás la <b>SEGUNDA RESPUESTA</b>, para ayudar a esta resolver la labor propuesta.</label> 
                                <input type="number" name="Q2" class="form-control mb-5" placeholder="Pregunta 2">

                                <label style="display:none;">
                                En la pizarra está el problema, al final su solución, lo que buscas está resaltado, evitemos confusión. soy la <b>TERCERA PISTA</b>, no te atrevas a titubear ¡corre, corre! que el tiempo se te va a acabar!</label>
                                <input type="number" name="Q3" class="form-control mb-5" placeholder="Pregunta 3">

                                <label style="display:none;">
                                La <b>CUARTA RESPUESTA</b> no está lejos de aquí, busca donde una linda planta crece feliz. Ten mucho con cuidado, no se vaya a caer, porque la clave está justo donde no puedes ver</label>
                                <input type="text" name="Q4" class="form-control mb-5" placeholder="Pregunta 4">

                                <label style="display:none;">
                                En la biblioteca, mi nombre es solo una palabra, la <b>QUINTA RESPUESTA</b> que hará que la puerta abra. Tengo nombre de dios romano y estoy a simple vista. tengo anillos luminosos, para que descubras esta pista</label> 
                                <input type="text" name="Q5" class="form-control mb-5" placeholder="Pregunta 5">

                                <input type="submit" value="Validar" class="btn btn-info my-2">
                            </form>
                        </div>
                    </div>
                    ` 

const stageOneAnswers = ["TOBY",445577,25,"CLOROFILA","SATURNO"]

function validateFormOne() {
    let Q1 = document.forms["formOne"]["Q1"].value;
    let Q2 = document.forms["formOne"]["Q2"].value;
    let Q3 = document.forms["formOne"]["Q3"].value;
    let Q4 = document.forms["formOne"]["Q4"].value;
    let Q5 = document.forms["formOne"]["Q5"].value;

    if (Q1== "TOBY" && Q2 == 445577 && Q3 == 25 && Q4 == "CLOROFILA" && Q5 == "SATURNO") {
        console.log("Valida respuestas Qs 1 a 5");    
        textDisplay.textContent = "Tiempo restante para hackeo de servidores";
        textDisplay.classList.remove("text-danger");
        textDisplay.classList.remove("text-info");
        stageLoader.innerHTML = stageTwo;
        //alert("Es correcto");
        return false;
    }
    else if (Q1== "" || Q2 == "" || Q3 == "" || Q4 == "" || Q5 == "") {
        console.log("Valida campos Qs 1 a 5");        
        incompleteAudio.play();
        textDisplay.textContent = "INCOMPLETO: Entiendo que seas lento... pero debes escribir algo en cada campo";
        textDisplay.classList.add("text-info");
        textDisplay.classList.remove("text-danger");
        //alert("Debes escribir algo en cada campo");
        return false;
    }
    else if (Q1!== "TOBY" || Q2 !== 445577 || Q3 !== 25 || Q4 !== "CLOROFILA" || Q5 !== "SATURNO") {
        console.log("Valida respuestas Qs 1 a 5"); 
        errorAudio.play();       
        textDisplay.textContent = "ERROR: ah ah ah... no escribiste las palabras mágicas";
        textDisplay.classList.remove("text-info");
        textDisplay.classList.add("text-danger");
        //alert("Es incorrecto");
        return false;
    }
  } 

/*Phase two: People has to resolve a keys puzzle, type the word and pass the door*/

const stageTwo =  `<div class="row">
                        <div class="col-md-6">
                        <h2 class="fw-bold text-center">3 puertas una llave, un intento.</h2>                             
                            <form name="formTwo" onsubmit="validateFormTwo(); return false;" method="get"> 
                                <input type="text" name="Q6" class="form-control mb-5" placeholder="Pregunta 6">                    
                                <input type="submit" value="Validar" class="btn btn-info my-3">
                            </form> 
                        </div>
                        <div class="col-md-6">
                            
                            <img src="https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/ShadowByte-03.jpg" class="img-fluid"> 
                            <p class="text-center">No puedo esperar a que falles</p> 
                        </div>
                    </div>                     
                    ` 
const stageTwoAnswers = ["CloudSync","PowerFly","OmniSignal"]

function validateFormTwo() {
    let Q6 = document.forms["formTwo"]["Q6"].value;
    if (Q6 == "")  {
        console.log("Valida Q6 Incompleto")
        //alert("Error en pregunta 6");
        textDisplay.classList.remove("text-danger");
        textDisplay.classList.add("text-info");
        textDisplay.textContent = "INCOMPLETO: Entiendo que seas lento... pero debes escribir algo en cada campo";
        incompleteAudio.play();       

        return false;
    }
    /*
    else if (Q6 !== "CloudSync" || Q6 !== "PowerFly" || Q6 !== "OmniSignal") {
        console.log("Valida Q6 Error")
        //alert("Q6 Correcto");
        textDisplay.classList.remove("text-info");
        textDisplay.classList.add("text-danger");
        textDisplay.textContent = "ERROR: ah ah ah... no escribiste las palabras mágicas";   
        errorAudio.play();  
        return false;        
    }   */ 

    else if (Q6 == "CloudSync" || Q6 == "PowerFly" || Q6 == "OmniSignal") {
        console.log("Valida Q6 Exito")
        //alert("Q6 Correcto");
        textDisplay.classList.remove("text-info");
        textDisplay.classList.remove("text-danger");
        textDisplay.textContent = "Tiempo restante para hackeo de servidores";   
        stageLoader.innerHTML = stageThree;        
        return false;        
    }    
  } 

/*Phase three: Displays a form with 3 questions, validates correct answers if correct goes to success stage else its game over*/
const stageThree =  `<div class="row">
                        <div class="col-md-6">
                            <img src="https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/ShadowByte-02.jpg" class="img-fluid">
                            <p class="fs-5  text-center">La IA  es aliada o enemiga un copiloto sería ideal en esta travesía</p>
                        </div>
                        <div class="col-md-6"> 
                            <h2 class="fw-bold text-center">El virus se ha encriptado detrás de tres acertijos</h2>
                            <form name="formThree" onsubmit="validateFormThree(); return false;" method="get">    
                                Un servidor tiene una capacidad de almacenamiento de 2 terabytes (TB). Si cada archivo ocupa en promedio 500 megabytes (MB), ¿cuántos archivos exactamente puede almacenar el servidor?
                                <input type="number" name="Q7" class="form-control mb-5" placeholder="Pregunta 7">      

                                Si el servidor A procesa 3 veces más solicitudes que el servidor B, y juntos procesan 2400 solicitudes en una hora, ¿cuántas solicitudes procesa cada servidor?                        
                                <input type="number" name="Q8" class="form-control mb-5" placeholder="Pregunta 8">    

                                Un servidor procesa 1200 solicitudes en 5 minutos. ¿Cuántas solicitudes procesará en 8 minutos si trabaja a la misma velocidad?                        
                                <input type="number" name="Q9" class="form-control mb-5" placeholder="Pregunta 9"> 

                                <input type="submit" value="Validar" class="btn btn-info my-3">
                            </form> 
                        </div>
                    </div>` 

 const stageThreeAnswers = [4194,1800,1920]

 function validateFormThree() {
    let Q7 = document.forms["formThree"]["Q7"].value;
    let Q8 = document.forms["formThree"]["Q8"].value;
    let Q9 = document.forms["formThree"]["Q9"].value;

    if (Q7== 4194 && Q8 == 1800 && Q9 == 1920) {
        console.log("Valida respuestas Qs 7 a 9");
        textDisplay.classList.remove("text-info");
        textDisplay.classList.remove("text-danger");
        textDisplay.classList.add("text-win");
        textDisplay.textContent = "EXITO: Información resguardada, hackeo evitado";       
        stageLoader.innerHTML = stageEnding;  
        winAudio.play();  
        pauseTimer();
        return false;
    }
    else if (Q7== "" || Q8 == "" || Q9 == "") {
        console.log("Valida campos Qs 7 a 9")
        //alert("Debes escribir algo en cada campo");
        textDisplay.textContent = "INCOMPLETO: Entiendo que seas lento... pero debes escribir algo en cada campo";
        incompleteAudio.play();  
        textDisplay.classList.add("text-info");
        textDisplay.classList.remove("text-danger");
        return false;
    }
    else if (Q7!== 4194 || Q8 !== 1800 || Q9 !== 1920) {
        console.log("Valida respuestas Qs 7 a 9")
        //alert("Es incorrecto");
        textDisplay.classList.add("text-danger");
        errorAudio.play();  
        textDisplay.textContent = "ERROR: ah ah ah... no escribiste las palabras mágicas";
        return false;
    }
  } 

/*Stage ending*/
const stageGameOver =  `<div class="row">
                            <div class="col-md-12 position-relative">                            
                                <video autoplay width="100%" height="auto" style="aspect-ratio: 16/9;">
                                    <source src="https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/ShadowByte-3.mp4" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                <div class="w-100 p-4 text-center"  style="background: rgba(0,0,0,.8)">
                                    <p class="fw-bold text-center">"Jajaja... oh esperen, ¿realmente creyeron que podrían detenerme?"</p>
                                    <input id="A0" type="submit" onclick="reStartGame()" value="Reiniciar" class="btn btn-info my-2">
                                </div>                              
                            </div>
                        </div> 
                        `; 

const stageEnding =  `<div class="row">
                        <div class="col-md-12 position-relative">
                            <video autoplay width="100%" height="auto" style="aspect-ratio: 16/9;">
                                <source src="https://marketing-images.intcomex.com/images/xam/2024/NOV/XAM-vbs-2025/img/ShadowByte-2.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="w-100 p-4 text-center" style="background: rgba(0,0,0,.8)">
                                <p class="fw-bold text-center">"No crean que son muy inteligentes, esta vez tuvieron solo suerte, les aseguró nos veremos nuevamente"</p>
                                <input id="A0" type="submit" onclick="reStartGame()" value="Reiniciar" class="btn btn-info my-2">
                            </div>                              
                        </div>
                       </div>     
`;   



