var ipt = document.querySelector("#user-ipt");
var flip_btn = document.querySelector(".flip");

var output = document.querySelector("#output");

var trans_type = document.querySelector("#trans-type");

ipt.oninput = main;
trans_type.oninput = main;
//dont clear to avoid doing something that wasnt advertised on the button

function main() {
    ipt_value = ipt.value;

    output.value = ""


    if (trans_dir === "into") {

        switch (trans_type.value) { // && trans_dir === "into"
            case "binary": // && true
                for (let i = 0; i < ipt_value.length; i++) {
                    output.value += ipt_value.charCodeAt(i).toString(2) + " ";
                }
                break;

            case "char": // && true
                for (let i = 0; i < ipt_value.length; i++) {
                    output.value += ipt_value.charCodeAt(i) + " ";
                }
                break;

            case "hex":
                for (let i = 0; i < ipt_value.length; i++) {
                    output.value += ipt_value.charCodeAt(i).toString(16) + " ";
                }
                break;

            case "htmlcode":
                for (let i = 0; i < ipt_value.length; i++) {
                    console.log(i, ipt_value.length, ipt.value);
                    output.value += "&#" + ipt_value.codePointAt(i) + "; ";
                }
            }
        } else if (trans_dir === "from") {
            
            switch (trans_type.value) { //&& trans_dir === "from" //FLIP THIS HAVENT IMPLEMENTED YET
                case "binary": // && true
                var ipt_array = ipt_value.split(" ");
                for (let i = 0; i < ipt_array.length; i++) {
                    output.value += String.fromCharCode(parseInt(ipt_array[i], 2));
                }
                break;
                
                case "char": // && true
                var ipt_array = ipt_value.split(" ");
                for (let i = 0; i < ipt_array.length; i++) {
                    output.value += String.fromCharCode(ipt_array[i]);
                }
                break;
                
                case "hex": // && true
                var ipt_array = ipt_value.split(" ");
                for (let i = 0; i < ipt_array.length; i++) {
                    output.value += String.fromCharCode(parseInt(ipt_array[i], 16));
                }
                break;
                
                case "htmlcode":
                    pattern = /\d+/g
                    var ipt_array = ipt_value.split(" ");
                    for (let i = 0; i < ipt_array.length; i++) {
                        console.log(ipt_array[i].match(pattern));
                        output.value += String.fromCodePoint((ipt_array[i].match(pattern)));
                    }

            }
            
    }

}


trans_dir = "into";

//into/from btn
flip_btn = document.querySelector(".flip");
flip_btn.onclick = function () {
    if (trans_dir === "into") {
        flip_btn.innerText = "from";
        trans_dir = "from";
    } else if (trans_dir === "from") {
        flip_btn.innerText = "into";
        trans_dir = "into";
    }
    main();
}

//copy btn
copy_btn = document.querySelector(".copy");
copy_btn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.value)
})

//clear btn
clear_btn = document.querySelector(".clear");
clear_btn.addEventListener("click", () => {
    ipt.value = "";
    output.value = "";
})