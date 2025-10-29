const balance = document.querySelector("#balance")
const Description = document.querySelector("#desc")
const amount = document.querySelector("#amount")
const inc_amt = document.querySelector("#inc-amt")
const exp_amt = document.querySelector("#exp-amt")
const trans = document.querySelector("#trans")
const form = document.querySelector("#form")

/*
const dummyData =[
    {id:1, Description: "Flower",amount:-20},
    {id:2, Description: "Salary",amount: 3500},
    {id:3, Description: "Book",amount:-10},
    {id:4, Description: "Camera",amount:-150},
    {id:5, Description: "Petrol",amount:-250}
];

let transactions = dummyData;
*/
const localstorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localstorageTrans !== null ? localstorageTrans : [];


function loadTransactionDetails(transaction){
    const sing = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc");
    item.innerHTML = `
    ${transaction.Description} <span>${sing} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removetrans(${transaction.id})">x</button>`
    trans.appendChild(item);
}

function removetrans(id){
    if (confirm("Are you sur you want to delete Transcantion?"))
        {
            transactions = transactions.filter((transaction)=> transaction.id != id);
            config();
            updateLocalStorage();
        }
    else{
        return;
    }
}
function updateAmount(){
   const amounts =  transactions.map((transaction)=>transaction.amount);
   const total = amounts.reduce((acc,iteam)=>(acc += iteam),0).toFixed(2);
   balance.innerHTML = `₹ ${total}`;

    const income = amounts.filter((item)=>item>0).reduce((acc,iteam)=>(acc +=iteam),0).toFixed(2);
    inc_amt.innerHTML = `₹ ${income}`;

    const expense = amounts.filter((item)=>item<0).reduce((acc,iteam)=>(acc +=iteam),0);
    exp_amt.innerHTML = `₹ ${Math.abs(expense)}`;
}

function config(){
    trans.innerHTML = "";
    transactions.forEach(loadTransactionDetails)
    updateAmount();
}
function addTransaction(e){
    e.preventDefault();
    if (Description.value.trim() == "" || amount.value.trim() == ""){
        alert("Please Enter Description And Amount");
    }else{
        const transaction = {
            id : uniqueId(),
            Description : Description.value,
            amount : +amount.value,
        };
        transactions.push(transaction)
        loadTransactionDetails(transaction);
        Description.value = "";
        amount.value = "";
        updateAmount();
        updateLocalStorage();
    }
}
form.addEventListener("submit",addTransaction);

window.addEventListener("load",function (){
    config();
});

function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}

function uniqueId(){
    return Math.floor(Math.random()*10000)
}

