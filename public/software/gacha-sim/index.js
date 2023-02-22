//**save all ipt defaults to cookies**
//**add rate up targeter */

six = parseInt(ssr_prob.value);
five = parseInt(sr_prob.value);
four = parseInt(r_prob.value);

//keep percents equal to 100, dump to lowest rarity --
//**update to check the lowest rarity set thats greater
//than 0 and use that as the dump target.**
//if lowest becomes 0, then set new lowest to dump
prob_array = [ur_prob, ssr_prob, sr_prob, r_prob, c_prob]

prob_array.forEach(cur_val => {
    cur_val.oninput = function () {
        six = parseInt(ssr_prob.value);
        five = parseInt(sr_prob.value);
        four = parseInt(r_prob.value);
        if (six + five + four != 100) {
            four += 100 - (six + five + four);
            r_prob.value = four;
        }
    }
});


//swap alpha with nums. **save to cookies**
num_alpha = document.querySelector(".num_alpha");
star = false;
num_alpha.onclick = function () {
    if (star === false) {
        for (i = 0; i < prob_array.length; i++) {
            star = true;
            num_alpha.innerText = "R";
            prob_array[i].previousSibling.previousSibling.innerText = 5 - i + "★";
        }
    } else {
        for (i = 0; i < prob_array.length; i++) {
            star = false;
            num_alpha.innerText = "★";
            switch (i) {
                case 4:
                    prob_array[i].previousSibling.previousSibling.innerText = "C";
                    break;
                case 3:
                    prob_array[i].previousSibling.previousSibling.innerText = "R";
                    break;
                case 2:
                    prob_array[i].previousSibling.previousSibling.innerText = "SR";
                    break;
                case 1:
                    prob_array[i].previousSibling.previousSibling.innerText = "SSR";
                    break;
                case 0:
                    prob_array[i].previousSibling.previousSibling.innerText = "UR";
                    break;
            }
        }
    }
}


roll_btn = document.querySelector(".roll_btn");
//grab rolled box
rolled = document.querySelector(".rolled");
//grab counters, init
ssr_counter = document.querySelector(".ssr_counter");
ssr_amt = 0;
ssr_counter.innerText = ssr_amt;

roll_counter = document.querySelector(".roll_counter");
roll_amt = 0;
roll_counter.innerText = roll_amt;

ratio = document.querySelector(".ratio");
ratio.innerText = 0;

gem = document.querySelector(".gem");
cost = cost_ipt.value;
gem.innerText = 0;

roll_btn.onclick = function () {
    rolled.innerHTML = "" //reset children
    for (let i = 0; i < roll_amt_ipt.value; i++) {
        roll_amt++;
        ran_num = Math.floor((Math.random() * 100)) + 1;
        //check if less than or equal to roll
        if (ran_num <= six) {
            ssr_amt++;
            ssr_counter.innerText = ssr_amt;
            rarity = document.createElement("span");
            rarity.innerText = "SSR   ";
            rarity.style.color = "gold";
            rolled.appendChild(rarity);
        } else if (ran_num <= five) {
            rarity = document.createElement("span");
            rarity.innerText = "SR   ";
            rarity.style.color = "purple";
            rolled.appendChild(rarity);
        } else {
            rarity = document.createElement("span");
            rarity.innerText = "R   ";
            rarity.style.color = "cornflowerblue";
            rolled.appendChild(rarity);
        }
        //print
        roll_counter.innerText = roll_amt;
        ratio.innerText = ((ssr_amt / roll_amt) * 100).toFixed(3) + "%";
        gem.innerText = roll_amt * cost;
    }
}
