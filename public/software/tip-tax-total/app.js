var item_i = 2;
ipt_tax.disabled = true;
ipt_tip_percent.disabled = true;
ipt_tip_dollar.disabled = true;
ipt_tip_total.disabled = true;
factor_tax_yes.disabled = true;
factor_tax_no.disabled = true;

//live list of all current and future items
price_li_ipt = price.getElementsByTagName('input');

new_price_item.onclick = () => {
    label_dollar = document.createElement("label");
    label_dollar.innerHTML = "$ ";

    dollar = document.createElement("input");
    dollar.type = "number";
    dollar.min = "0";
    dollar.max = "100000000";
    dollar.step = ".01";

    dollar.classList.add("price_item");
    dollar.id = "dollar_item" + item_i;
    label_dollar.setAttribute("for", dollar.id);

    item_i++;

    li = document.createElement("li");
    li.appendChild(label_dollar);
    li.appendChild(dollar);

    price.appendChild(li);

    //listens for element
    li.addEventListener('change', add_to_total)
}


function add_to_total() {
    subtotal = 0
    Array.from(price_li_ipt).forEach(cur_val => { //loop thru all price ipts

        cur_val.value = Math.abs(cur_val.value)

        cur_val.value = Math.round(cur_val.value * 100) / 100

        if (cur_val.value !== '') {
            subtotal += parseFloat(cur_val.value);
        } else {
            //catches if you delete input after typing something. sets to 0
            cur_val.value = 0
        }
    });
    subtotal = Math.round(subtotal * 100) / 100;

    subtotal_str = add_zeros(subtotal);

    price_total.innerHTML = "$" + subtotal_str;

    
    //unlock after item has been entered
    ipt_tax.disabled = false;
    ipt_tip_percent.disabled = false;
    ipt_tip_dollar.disabled = false;
    ipt_tip_total.disabled = false;
    factor_tax_yes.disabled = false;
    factor_tax_no.disabled = false;

    //run these to update each time this function is updated
    get_tax()
    if (cur_tip_type != undefined) { //only run if the user has entered a tip type, just to avoid a cosmetic error
        factor_tax_function(cur_tip_type)
    }

}

//listen for original 
ipt_price_dollar.addEventListener('change', add_to_total)

//tax listener
ipt_tax.addEventListener('change', get_tax);


function get_tax() {

    //catches negative and long decimals
    ipt_tax.value = Math.abs(ipt_tax.value);
    ipt_tax.value = Math.round(ipt_tax.value * 100) / 100;

    taxed_portion = 0;
    taxed_total = 0;
    //tax amount - just grab from ele to avoid using e.target.value so it works outside of an eventlistener
    var tax_amt = ipt_tax.value;
    //get the taxed portion in dollars
    taxed_portion = subtotal * ((tax_amt / 100));
    //get new total after tax
    taxed_total = subtotal * ((tax_amt / 100) + 1);

    //print
    taxed_portion = Math.round(taxed_portion * 100) / 100;
    taxed_total = Math.round(taxed_total * 100) / 100;

    //add zeros for display purposes
    taxed_portion_str = add_zeros(taxed_portion);
    taxed_total_str = add_zeros(taxed_total);
    tax_amount.innerHTML = "$" + taxed_portion_str;
    tax_total.innerHTML = "$" + taxed_total_str;

    if (cur_tip_type != undefined) {
        factor_tax_function(cur_tip_type)
    }

}

var taxed_total;

function add_zeros(num) {
    num_str = num.toString().split('.')

    if (num_str[1] === undefined) { //catches whole numbers and adds .00 to them
        return num_str[0] + '.00'
    }
    else if (num_str[1].length == 1) { //catches .1,.2,.3,.4,.5,... and adds a zero
        return num_str[0] + '.' + num_str[1] + '0';
    }
    else { //catches if you dont need any zeros and throws back
        return num
    }
}



//tax in or out
//IN - use total after tax 
//OUT - use subtotal before tax

tax_options = document.getElementsByName('factor_tax')
// var taxed_counted = true;
var working_tip_total;

ipt_tip_percent.addEventListener('change', factor_tax_function)
ipt_tip_dollar.addEventListener('change', factor_tax_function)
ipt_tip_total.addEventListener('change', factor_tax_function)

factor_tax_yes.addEventListener('change', factor_tax_function)
factor_tax_no.addEventListener('change', factor_tax_function)

var cur_tip_type

function factor_tax_function(e) {

    cur_tip_type = e

    cur_tip_type.target.value = Math.abs(cur_tip_type.target.value);
    cur_tip_type.target.value = Math.round(cur_tip_type.target.value * 100) / 100

    //empty other strings when one is entered
    switch (e.target.id) {
        case 'ipt_tip_percent':
            ipt_tip_dollar.value = '';
            ipt_tip_total.value = '';
            break;
        case 'ipt_tip_dollar':
            ipt_tip_percent.value = '';
            ipt_tip_total.value = '';
            break;
        case 'ipt_tip_total':
            ipt_tip_percent.value = '';
            ipt_tip_dollar.value = '';
            break;
    }

    //for if the user wants their taxed factored into their percentage tip amount
    if (tax_options[0].checked === true) { //yes
        working_tip_total = taxed_total
    }
    
    if (tax_options[1].checked === true) { //no
        working_tip_total = subtotal
    }
    
    calc_tip_total();
}

function calc_tip_total() {

    //*** put Math.abs on tip and desired tip .values */
    //also add round to inputs
    //recalc everything when anything is changed


    // tip_dollar = 0;
    // tip_percent =  0;

    if (ipt_tip_percent.value != '') { //start from percent

        tip_dollar = (working_tip_total * (ipt_tip_percent.value / 100)); //calc tip dollar from %.value
        tip_dollar = Math.round(tip_dollar * 100) / 100; //round
        tip_dollar_str = add_zeros(tip_dollar); //add zeros for display
        tip_amount_money.innerHTML = '$' + tip_dollar; //display

        tip_amount_percent.innerHTML = ipt_tip_percent.value + '%';

        //if factor tax is off. then it should be taxed total plus tip dollar
        tip_total_var = working_tip_total * ((ipt_tip_percent.value / 100) + 1);
        tip_total_var = Math.round(tip_total_var * 100) / 100;
        tip_total_var_str = add_zeros(tip_total_var);
        tip_total.innerText = '$' + tip_total_var;
    }

    if (ipt_tip_dollar.value != '') { //start from dollar amount to pay

        tip_dollar_value = parseFloat(ipt_tip_dollar.value);
        tip_dollar_value_str = add_zeros(tip_dollar_value);
        tip_amount_money.innerHTML = '$' + tip_dollar_value_str;


        if (taxed_total == 0){ //error styling
            error.innerText = 'ERROR: Attempting to divide by zero may collapse reality';
            error.style.visibility = 'initial'; //reveal with visibility so animations still work
            error.style.opacity = '1'; //transition is 1 second in css so it fades in
            setTimeout(()=>{ //wait 2 seconds then fade out
                error.style.opacity = '0';
            },2000)
            setTimeout(()=>{ //wait 3 seconds then turn off
                error.style.visibility = 'hidden';
            },3000)
        }
        
        tip_total_temp = tip_dollar_value + taxed_total
        tip_percent = ((tip_total_temp - taxed_total) / Math.abs(taxed_total)) * 100;
        tip_percent = Math.round(tip_percent * 100) / 100;
        tip_amount_percent.innerHTML = tip_percent + '%';

        tip_total_var = taxed_total + tip_dollar_value;
        tip_total_var_str = add_zeros(tip_total_var);
        tip_total.innerHTML = '$' + tip_total_var_str;
    }
    
    if (ipt_tip_total.value != '') { //start from total 
        
        //if desired total after tip is lower than taxed total then set input equal to taxed total to avoid negatives
        //error msg to inform user 

        if (ipt_tip_total.value < taxed_total) {
            ipt_tip_total.value = taxed_total;
            error.innerText = 'Final total entered is lower than the taxed total';
            error.style.visibility = 'initial';
            error.style.opacity = '1';
            setTimeout(()=>{
                error.style.opacity = '0';
            },2000)
            setTimeout(()=>{
                error.style.visibility = 'hidden';
            },3000)
        }

        tip_dollar = (ipt_tip_total.value - taxed_total);
        tip_dollar = Math.round(tip_dollar * 100) / 100;
        tip_dollar_str = add_zeros(tip_dollar);
        tip_amount_money.innerHTML = '$' + tip_dollar_str;
        
        if (taxed_total == 0){
            error.innerText = 'ERROR: Attempting to divide by zero may collapse reality';
            error.style.visibility = 'initial';
            error.style.opacity = '1';
            setTimeout(()=>{
                error.style.opacity = '0';
            },2000)
            setTimeout(()=>{
                error.style.visibility = 'hidden';
            },3000)
        }

        tip_percent = ((ipt_tip_total.value - taxed_total) / Math.abs(taxed_total)) * 100;
        tip_percent = Math.round(tip_percent * 100) / 100;
        tip_amount_percent.innerHTML = tip_percent + '%';

        tip_total.innerText = '$' + add_zeros(ipt_tip_total.value);
    }
    
}

//tip_amount_money = (desired amount - subtotal) or (subtotal * % - subtotal)
//tip_amount_percent = (desired percent) or ((final_val - start_val)/abs(start_val)) * 100
//tip_total = (desired amount) or (subtotal * desired percent)


//-------------------------------------------------
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