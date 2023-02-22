var x_pos = window.innerWidth / 2, y_pos = 1000, dir = 0, i = 15, temp_i = i - .01, move = false, ball_spin = 0, apex = 1;

ball.style.transform = `translate(${window.innerWidth / 2}px, 0)`;

var pos_neg = true;

var speed = 15

function shoot_ball(){
    //stop listening
    ball.removeEventListener('click', shoot_ball);
    //beautify
    ball.style.cursor = 'auto';
    slider_height.style.visibility = 'hidden';
    slider_x.style.visibility = 'hidden';

    //hit right of screen
    if (x_pos + ball.offsetWidth > window.innerWidth){
        pos_neg = false;
    }
    //hit left
    if (x_pos < 0){
        pos_neg = true;
    }
    //after hit left, move right
    if (pos_neg == true){
        x_pos += Math.abs(dir); 
        //when ball is almost done bouncing slow it down
        if (apex < .2){dir *= .98;}

        //if direction isn't centered
        if (dir != 0){
            //if direction is 1 or 2, spin slower
            if (dir <= 2 && dir > 0){
                ball_spin += 1;
            }
            else{ //spin faster otherwise
                ball_spin += 3;
            }
        }
    }
    if (pos_neg == false){
        x_pos -= Math.abs(dir); //dir goes into neg on input for left for simplicity use abs
        if (apex < .2){dir *= .98;}

        //if direction is -2 or -1, spin  slower
            if (dir >= -2 && dir < 0){
                ball_spin -= 1;
            }
            else{//spin faster if above 3 (30%)
                ball_spin -= 3;
            }
        
    }

    if (ball_spin == 360){ball_spin = 0}

    //move down when i has been reduced so much its less than 1
    if (i < 1 || move){
        //divide by decimal increase i to original amount
        i /= apex;
        //move positive amount which is down
        y_pos += i;
        //keep going
        move = true;
    }
    //move up when i is at original value - temp_i to catch clipping
    if (i >= temp_i || !move){
        //when ball hits ground reset y and reduce apex
        if (y_pos > 0){y_pos = 0; apex *= .9;}
        //multiply by decimal reduce each time
        i *= apex;
        //negative value is upwards, move up gradually less each time
        y_pos -= i;
        //keep it going
        move = false;
    }
    ball.style.transform = `translate( ${x_pos}px, ${y_pos}px) rotate(${ball_spin}deg)`;

    if (apex > .01){
        // speed += .065;
        setTimeout(shoot_ball, speed);
        
    }else{
        //reset for next click
        i = parseInt(slider_height.value);
        temp_i = i - .01;
        y_pos = 1000;
        speed = 15;
        move = false;
        apex = 1;
        dir = parseInt(slider_x.value);
        if (dir < 0){
            pos_neg = false;
        }else{
            pos_neg = true;
        }
        //listen & beautify
        ball.style.cursor = 'pointer';
        slider_height.style.visibility = 'visible';
        slider_x.style.visibility = 'visible';
        ball.addEventListener('click', shoot_ball);
    }
    
}

var height_per = 50, x_per = 0, power_per = 0;

slider_height.oninput = ()=>{
    i = parseInt(slider_height.value);
    temp_i = i - .01;
    height_per = Math.floor((i/30)*100);
    height_label.innerHTML = `${height_per}%`;
}
slider_x.oninput = ()=>{
    dir = parseInt(slider_x.value);
    
    //if direction is neg set left
    if (dir < 0){
        pos_neg = false;
    }else{ //if direction is 0 or pos set right
        pos_neg = true;
    }
    
    x_per = Math.floor((Math.abs(dir)/10) * 100);
    if (dir == 0){
        x_label.innerHTML = `C`;
    } else if (pos_neg == false){
        x_label.innerHTML = `${x_per}L`;
    } else {
        x_label.innerHTML = `${x_per}R`;
    }
}


ball.addEventListener('click', shoot_ball);