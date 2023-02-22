document.querySelectorAll('input').forEach((val) => { //run func on every user input
    val.addEventListener('input', scramble);
})

document.querySelectorAll('.refresh').forEach((val) => { //run func on refresh
    val.addEventListener('click', scramble);
})

up.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); //scroll up
})

prep_array = ['of ', 'the ', 'of the ', '']

function scramble() {
    if (word1.checked) { //scamble by word
        array = ipt.value.trim().match(/\S+/gi); //seperate by spaces
    } else if (char1.checked) { //scarmble by char
        array = ipt.value.trim().match(/\S/gi); //grab all nonwhitespace chars
    }
    if (ipt2.value !== "") { //if input isn't empty
        if (word2.checked) {
            array2 = ipt2.value.trim().match(/\S+/gi);
        } else if (char2.checked) {
            array2 = ipt2.value.trim().match(/\S/gi);
        }
    }

    let i = 0; //count
    let ran_done = ""; //results

    // if (range_on1.checked) { //range for 1st selected
        // name_len1 = range_val1.value; //length is value
    // } else 
    if (fixed_on1.checked) { //fixed selected
        name_len1 = fixed_val1.value;
    }

    if (range_on2.checked) {
        name_len2 = range_val2.value;
    } else if (fixed_on2.checked) {
        name_len2 = fixed_val2.value;
    }

    while (i < num.value) { //# of generated names
        let name = "";

        if (range_on1.checked) { //first name
            name_len1 = Math.round(Math.random() * (range_val1.value - 1) + 1);
        }
        console.log(name_len1);
        for (let x = 0; x < name_len1; x++) { //length of names
            // if (word1.checked) {
            //     name += (array[Math.round(Math.random() * (array.length - 1))] + " ").toLowerCase().replace(/^\w/gi, x => {return x.toUpperCase();}); //random word
            // } else if (char1.checked) {
            //     name += (array[Math.round(Math.random() * (array.length - 1))]).toLowerCase().replace(/^\w/gi, x => {return x.toUpperCase();}); //random char
            // }
            name += (array[Math.round(Math.random() * (array.length - 1))]).toLowerCase().replace(/^\w/gi, x => { return x.toUpperCase(); });
            if (word1.checked) {
                name += " ";
            }
        }
    
        if (char1.checked) {
            name += ' ';
        }

        if (of.checked) { //preposition
            name += `${of.value} `;
        } else if (the.checked) {
            name += `${the.value} `;
            // name += `&nbsp;`;
        } else if (ofthe.checked) {
            name += `${ofthe.value} `;
        } else if (random.checked) {
            name += prep_array[Math.round(Math.random() * (prep_array.length - 1))];
        }

        if (ipt2.value !== "") { //last name
            if (range_on2.checked) {
                for (let x = 0; x < Math.round(Math.random() * (name_len2 - 1) + 1); x++) { //length of names
                    if (word2.checked) {
                        name += (array2[Math.round(Math.random() * (array2.length - 1))] + " ").toLowerCase().replace(/^\w/gi, x => { return x.toUpperCase(); }); //random word
                    } else if (char2.checked) {
                        name += (array2[Math.round(Math.random() * (array2.length - 1))]).toLowerCase().replace(/^\w/gi, x => { return x.toUpperCase(); }); //random char
                    }
                }
            } else if (fixed_on2.checked) {
                for (let x = 0; x < name_len2; x++) { //length of names
                    if (word2.checked) {
                        name += (array2[Math.round(Math.random() * (array2.length - 1))] + " ").toLowerCase().replace(/^\w/gi, x => { return x.toUpperCase(); }); //random word
                    } else if (char2.checked) {
                        name += (array2[Math.round(Math.random() * (array2.length - 1))]).toLowerCase().replace(/^\w/gi, x => { return x.toUpperCase(); }); //random char
                    }
                }
            }
        }

        i++; //count
        ran_done += i + ". " + name + "<br>"; //log
        // ran_done = ran_done.toLowerCase();
        // ran_done = ran_done.replace(/\b\w/ig, (x) => {return x.toUpperCase();})
        // ran_done = ran_done.replace(/\sof\s|the/ig, (x) => {return x.toLowerCase();})
    }
    results.innerHTML = ran_done; //print
}

black = 'rgb(40,40,40)';
white = 'rgb(220,220,220)';

dark.onclick = () => { //dark mode and save
    document.body.style.color = white;
    document.body.style.background = black;
    localStorage.setItem('color', white);
    localStorage.setItem('bg', black)
}
light.onclick = () => { //light mode and save
    document.body.style.color = black;
    document.body.style.background = white;
    localStorage.setItem('color', black);
    localStorage.setItem('bg', white)
}

window.onload = () => { //load last selected
    color = localStorage.getItem('color');
    bg = localStorage.getItem('bg');
    document.body.style.color = color;
    document.body.style.background = bg;
}

