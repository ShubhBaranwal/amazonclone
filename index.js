// const userName=document.querySelector(".search");


let productDiv=document.querySelector("#products");
let CategoryListDiv=document.querySelector("#filter-btn-container");

let allCat=[];
let displayProduct=async (allCheckCat=[])=>{
    productDiv.innerHTML='';

    let product=await fetch('https://fakestoreapi.com/products');
    let finalproduct=await product.json();
    
    finalproduct.forEach((element)=>{
// category ke data show karne ke liyr
if(!allCat.includes(element.category)){
    CategoryListDiv.innerHTML+=`
    <label>
      <input type="checkbox"  value="${element.category}" onclick='categoryFilter()'> ${element.category}
      </label>  
      `
     allCat.push(element.category)
    }

if(allCheckCat.length==0){
    allCheckCat=allCat;
}
if(allCheckCat.includes(element.category)){

        
        productDiv.innerHTML+=`
                  <div class="product-item">
                  <img src="${element.image}" />
                  <h4>${element.category}</h4>
                  <p>Rs. ${element.price} | ${element.rating.rate}</p>
                  <h3 class="product-name">${element.title}</h3>
                  
                  </div>
        `
    }

    
    })
}




displayProduct()


let categoryFilter=()=>{
    let checkInput= document.querySelectorAll("input[type='checkbox']");
    let checkdata=[];
    checkInput.forEach((e)=>{
        if(e.checked){
            checkdata.push(e.value);
        }
    })
    displayProduct(checkdata);
}


// const search = () =>{
//     const table = document.getElementById('productDiv');
//     console.log(table)
//     const mySearchField = document.getElementById('mySearchField');
    // const searchCharacters = []
    // mySearchField.addEventListener('keyup', (e) => {
    //     const searchString = e.target.value.toLowerCase();

    //     const filteredItems = items.filter((data) => {
    //         console.log('11',data, searchString)
    //         return (
    //             data.body.toLowerCase().includes(searchString) ||
    //             data.title.toLowerCase().includes(searchString)
    //         )
    //     });
    //     displayProduct(filteredItems);
    // });
//}


let search = async () => {
    let mySearchField = document.getElementById('mySearchField');
    let searchString = mySearchField.value.toLowerCase();
    let suggestionsDiv = document.getElementById('suggestions');

    if (searchString.length === 0) {
        suggestionsDiv.innerHTML = '';
        return;
    }
    
    let product = await fetch('https://fakestoreapi.com/products');
    let finalproduct = await product.json();

    let filteredItems = finalproduct.filter((data) => {
        return (
            data.title.toLowerCase().includes(searchString) ||
            data.category.toLowerCase().includes(searchString)
        );
    });
    if (filteredItems.length > 0) {
        suggestionsDiv.style.display = 'block';
    } else {
        suggestionsDiv.style.display = 'none';
    }
    suggestionsDiv.innerHTML = '';
    filteredItems.forEach((item) => {
        suggestionsDiv.innerHTML += `
            <div class="suggestion-item">
                <p>${item.title}</p>
            </div>
        `;
    });
};

















