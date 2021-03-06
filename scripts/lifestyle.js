  //------------------------------------------------------------------------------//---------------------------------------------------------------------------//
        // let count = document.getElementById("first_number_").innerHTML
        let count = 1
        console.log(count)
        url = `https://urban-out-fitters-backend.herokuapp.com/lifestyles?page=1&size=12`
        function next_page(){
            
             count = Number(count)+1;
            document.getElementById("product__img_name_price").innerHTML = null
            document.getElementById("first_number_").innerHTML  = count
            console.log(count+1)
            url = `https://urban-out-fitters-backend.herokuapp.com/lifestyles?page=${count}&size=12`
            getUser()
        }
      
        function previous_Page(){

             count = Number(count)-1;
            document.getElementById("product__img_name_price").innerHTML = null
            document.getElementById("first_number_").innerHTML  = count
            // x = 2;
            console.log(count+2)
            url = `https://urban-out-fitters-backend.herokuapp.com/lifestyles?page=${count}&size=12`
            getUser()
        }
      
        //-----------------fetching database----------------------//
        

        async function getUser() {
        
        try {
        
            let res = await fetch(url);            // get data from server by this line 
            var data = await res.json();
           
            //  let user = data.data            // collect data by this line (we use await for collect data )
            console.log("data:", data);
            // let women = data[0].women;
            // console.log("women:", women)
            appenddata(data)
        }
        
        catch (err) {
            console.log("this error get by spell mistake:", err)
        
        }
        }
        getUser()


//---------------------------//----------------------------------------//


function appenddata(data) {
  data.map(function (ele, index) {
    let div = document.getElementById("product__img_name_price");

    let d1 = document.createElement("div");
    d1.setAttribute("id", "main_product_div");
    d1.addEventListener("click", () => {
      // console.log("go to cart")
      strore_to_local(ele);
      // location.reload();

      // window.location.href = "./"                                                        //change the location and show the all details of that product
    });

    let img_div = document.createElement("div");
    img_div.setAttribute("id", "img_of_product"); ////chnage img function

    let img = document.createElement("img");
    img.src = ele.img1;

    // img.addEventListener("mouseout")

    img_div.addEventListener("mouseover", function () {
      // console.log("chnage img", index)
      changeProduct_img1(ele, index, img);
    });
    img_div.addEventListener("mouseout", function () {
      // console.log("chnage img", index)
      changeProduct_img2(ele, index, img);
    });

    img_div.append(img); // apendd img

    let details_div = document.createElement("div");
    details_div.setAttribute("id", "product_name_price");

    let name = document.createElement("p");
    name.innerText = ele.name;

    let price_discount = document.createElement("p");

    let price = document.createElement("span");
    price.innerText = `$${ele.price}   `;

    let discount = document.createElement("span");
    discount.innerText = ele.discount;
    discount.style.color = "cadetblue";
    price_discount.append(price, discount);

    let color = document.createElement("p");
    color.innerHTML = `<i class="fas fa-circle" style="color:${ele.color}; font-size: 20px;"></i> `;

    details_div.append(name, price_discount, color);

    d1.append(img_div, details_div);

    div.append(d1);
  });

  /////////////////////changing img when mouse over and mouseout//////////////////////////
  let changeProduct_img1 = (ele, index, img) => {
    // console.log("hello");
    if (img.src == ele.img1) {
      img.src = ele.img2;
    } else {
      img.src = ele.img1;
    }
  };
  let changeProduct_img2 = (ele, index, img) => {
    // console.log("hello");

    if (img.src == ele.img1) {
      img.src = ele.img2;
    } else {
      img.src = ele.img1;
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
}
// appenddata(data);

/////////////////////////////////store data of into the local storage ///////////////////////////////

let arr_local = JSON.parse(localStorage.getItem("cart")) || [];
let id = JSON.parse(localStorage.getItem("id")) || null;
// let token = JSON.parse(localStorage.getItem("token")) || null;
function strore_to_local({
  img1,
  img2,
  name,
  price,
  discount,
  size,
  color,
  brand,
}) {
  let item_obj = {
    img1,
    img2,
    name,
    price,
    discount,
    size,
    color,
    brand,
    user_id: `${id}`,
  };
   addtocart(item_obj);
  
  async function addtocart(item_obj) {
    console.log(typeof(id));
    try {
      let data = item_obj;

      data = JSON.stringify(data);

      let response = await fetch(
        `https://urban-out-fitters-backend.herokuapp.com/bag`,
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data1 = await response.json();
      console.log(data1);
    } catch (error) {
      console.log(error);
    }
  }
 
  // console.log(img1,img2,name,price,discount,size,color,brand);

  arr_local.push(item_obj);
  // console.log(arr_local.length);

  localStorage.setItem("cart", JSON.stringify(arr_local));
}

/////////////////////    filter functions are here ///////////////////////////////////

///            by size filter

document.getElementById("bysize_").addEventListener("change", async()=>{
   
  url = `https://urban-out-fitters-backend.herokuapp.com/lifestyles`

  try {
          
      let res = await fetch(url);            // get data from server by this line 
      var data = await res.json();
    
      let filter_items = data.filter(function(ele){
          var val = document.getElementById("bysize_").value;
          if(val=="size"){
              return ele.size
          }
          return ele.size ==val;
      })
      document.getElementById("product__img_name_price").innerHTML=null;
      // console.log(filter_items);
      appenddata(filter_items)
  }
  catch (err) {
      console.log("this error get by spell mistake:", err)
      
  }
  
})

/////         by color filter
document.getElementById("bycolor_").addEventListener("change", async()=>{
  url = `https://urban-out-fitters-backend.herokuapp.com/lifestyles`

  try {
          
      let res = await fetch(url);            // get data from server by this line 
      var data = await res.json();

      let filter_items = data.filter(function(ele){
          var val = document.getElementById("bycolor_").value;
          return ele.color ==val;
      })
      document.getElementById("product__img_name_price").innerHTML=null;
      // console.log(filter_items);
      appenddata(filter_items)
      
  } catch (err) {
      
      console.log("this error get by spell mistake:", err)
     }

})
/////    by brand filter

document.getElementById("bybrand_").addEventListener("change", async()=>{
       
  try {
          
      let res = await fetch(url);            // get data from server by this line 
      var data = await res.json();

      let filter_items = data.filter(function(ele){
          var val = document.getElementById("bybrand_").value;
          return ele.brand ==val;
      })
      document.getElementById("product__img_name_price").innerHTML=null;
      // console.log(filter_items);
      appenddata(filter_items)
  } catch (err) {
      console.log("this error get by spell mistake:", err)
  }
})

///////    by price filter

document.getElementById("byprice_").addEventListener("change", async()=>{
  url = `https://urban-out-fitters-backend.herokuapp.com/lifestyles`

  try {
          
      let res = await fetch(url);            // get data from server by this line 
      var data = await res.json();
      let filter_items = data.filter(function(ele){
          let val = document.getElementById("byprice_").value;
          if(val==25){
              return  Number(ele.price)<=val;
          }
          else if(val==50){
              return Number(ele.price)<=val && Number(ele.price)>=25;;
          }
          else if(val==100){
              return Number(ele.price)<=val && Number(ele.price)>=50;;
          }
          else if(val==200){
              return Number(ele.price)<=val && Number(ele.price)>=100;;
          }
          else if(val==500){
              return Number(ele.price)<=val && Number(ele.price)>=200;;
          }
          else if(val=="more") {
             return Number(ele.price)>=500;
          }
      })
      document.getElementById("product__img_name_price").innerHTML=null;
      // console.log(filter_items);
      appenddata(filter_items)
      
  } catch (err) {
      console.log("this error get by spell mistake:", err)
  }

})

///// ther is no function for free pickup ////

//////////////////////////////////   sort function here            /////////////////////////////////

document.getElementById("by_sort_").addEventListener("change",async()=>{
  url = `https://urban-out-fitters-backend.herokuapp.com/lifestyles`

  try {
          
      let res = await fetch(url);            // get data from server by this line 
      var data = await res.json();
  
      
      let sort_items = data.sort(function(a,b){
           let val = document.getElementById("by_sort_").value;

           if(val=="lowtohigh"){
               return Number(a.price) - Number(b.price);
           }
           else if(val == "hightolow"){
               return Number(b.price) - Number(a.price);
           }
           else if(val=="az"){
              if (a.name < b.name) return -1;
              return 0;
           }
           else if(val=="za"){
              if (a.name > b.name) return -1;
              return 0;
           }

      })

      document.getElementById("product__img_name_price").innerHTML=null;
      // console.log(sort_items);
      appenddata(sort_items)
  } catch (err) {
      console.log("this error get by spell mistake:", err)
  }
})