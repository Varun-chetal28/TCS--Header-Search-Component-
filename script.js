let hamburger = document.querySelector(".menu-btn");
let accordionshow = document.querySelector(".accordion-menu")
let search = document.querySelector("#input");
var rawData = document.querySelector("#tcsData").innerHTML;
var compiledTemplate = Handlebars.compile(rawData);
let autolist = document.querySelector(".autolist")
let questionmark = document.querySelector(".question-logo");
let closesearch = document.querySelector(".search__close");
let searchbar = document.querySelector(".search__bar");
let searchbox = document.querySelector(".search__box");
let body = document.querySelector(".tcs__home")


let n = true ;
async function fetchData (){
   const res = await fetch('info.json')
   const tcsData = await res.json();
   return tcsData;
}
let data1 = fetchData();



// fetch('info.json')
// .then(response => response.json())
// .then((data) 
data1.then(data => {
  var start = 0;
  var end = 3;
  let newdata = data.slice(start, end)
  var context = {
    gotData: newdata
  };
  // console.log(data);
  // console.log(newdata)
  var ourGeneratedHTML = compiledTemplate(context);
  document.getElementById("data-container").innerHTML += ourGeneratedHTML;
  document.addEventListener("scroll", () => {
    if (n== true ){
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    let modifier = 5;
    if (currentScroll + modifier > documentHeight) {
      start += 3;
      end += 3;
      const newdata = data.slice(start, end)
      var context = {
        gotData: newdata
      };
      var ourGeneratedHTML = compiledTemplate(context);
      document.getElementById("data-container").innerHTML += ourGeneratedHTML;
    }
  }
  })
 
});

let loadData =(data) =>{
  if ( data.gotData.length == 0){
    let emptyele = {
      "title" : "No result found" 
    }
    data.gotData.push(emptyele);
  }
  // console.log(data);
  var ourGeneratedHTML = compiledTemplate(data);
  document.getElementById("data-container").innerHTML = ourGeneratedHTML;
  
}

  const searchInfo = searchText =>{
    autolist.innerHTML = ""
    let suggestionList = document.querySelector(".autolist").children;
    let suggestionListArray = Object.values(suggestionList);
  data1.then(data => {   
    let newdata = [];
    if(all.classList.contains("selected")){
      let allData = newdata.filter(tcs =>{
        const regex = new RegExp(`^${searchText}` , 'gi');
        return tcs.title.match(regex) || (tcs.title.toLowerCase().includes(searchText.toLowerCase()))
      });
      newdata.push(...allData);
    }
    if(research.classList.contains("selected")){
      let researchData = data.filter(tcs =>{
        const regex = new RegExp(`^${researchtags}` , 'gi');
        return tcs.tag.match(regex) 
      });
      newdata.push(...researchData);
    }
    if(news.classList.contains("selected")){
      let newsData = data.filter(tcs =>{
        const regex = new RegExp(`^${newstags}` , 'gi');
        return tcs.tag.match(regex) 
      });
      newdata.push(...newsData);
    }
    if(blog.classList.contains("selected")){
      let blogData = data.filter(tcs =>{
        const regex = new RegExp(`^${blogtags}` , 'gi');
        return tcs.tag.match(regex) 
      });
      newdata.push(...blogData);
    }
    if(production.classList.contains("selected")){
      let productionData = data.filter(tcs =>{
        const regex = new RegExp(`^${productiontags}` , 'gi');
        return tcs.tag.match(regex) 
      });
      newdata.push(...productionData);
    }

    if(research.classList.contains("selected") == false && news.classList.contains("selected") ==false && production.classList.contains("selected") == false && blog.classList.contains("selected") == false ){
      newdata.push(...data)
    }
    
    console.log(newdata)
    let sortData = newdata.filter(tcs =>{
      autolist.innerHTML = "";
      const regex = new RegExp(`^${searchText}` , 'gi');
      return tcs.title.match(regex) || (tcs.title.toLowerCase().includes(searchText.toLowerCase()))
    });
    // let sortData = [];
    // newdata.forEach(tcs =>{
    //   const titles = tcs.title.split(" ");
    //   // console.log(titles)
    //   titles.some(matches =>{
    //     if(matches.toLowerCase().indexOf(searchText.toLowerCase()) == 0 ){
    //       sortData.push(tcs.title)
    //       return true;
    //     }
    //   })
    // })
    console.log(sortData);
    sortData.forEach(element => {
      console.log(element)
      //let li = `<li class = "autocompleteli" tabindex = "0"> ${element.title} </li>`;
      let li = document.createElement("li");
      li.tabIndex = "0";
      li.classList.add("autocompleteli");
      li.textContent = element.title
       autolist.append(li);
      //autolist.innerHTML += li;
      // console.log(element);
      li.addEventListener("click",(e)=>{
        let searchclick = sortData.filter(ele=>ele.title === element.title);
        loadData({gotData:searchclick});
      })
      
      if (searchText.length == 0 ){
        sortData = [];
        autolist.innerHTML = "";
        let result = "No Result Found"
        li = `<li class = "autocompleteli"> ${result} </li>`;
      }
      // console.log(element.title);
      

      // console.log(autolist.children);

      // sortData.forEach(autolist.children.innerHTML){
        
      // }
    });

    let allData = newdata.filter(tcs =>{
      const regex = new RegExp(`^${searchText}` , 'gi');
      return tcs.title.match(regex) || (tcs.title.toLowerCase().includes(searchText.toLowerCase()))
    });
    loadData({gotData:allData});
    
  
    // console.log(tcsinfo)
})
}





// suggestionlist.addEventListener("click" , ()=>{
//   if()
// })




body.addEventListener("click" , ()=>{
  autoCompleteBox.classList.remove("show");
  searchbar.classList.remove("show");
})

search.addEventListener('input' , ()=> {
  searchInfo(search.value);
  n = false;
});


let autoCompleteBox = document.querySelector(".autocomplete");
autoCompleteBox.addEventListener("click" , ()=>{
  autoCompleteBox.classList.remove("show");
  searchbar.classList.remove("show");
})
  


  search.addEventListener('keydown' , ()=> {
    autoCompleteBox.classList.add("show");
    searchInfo(search.value);
    n = false;
  }
  )

  let newsBoolean = false;
  let researchBoolean = false;
  let productionBoolean = false;
  let blogBoolean = false;
  // let displayArray = [false,false,false,false];




hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("ham-burger-change");
  accordionshow.classList.toggle("show");
}
)

const list = document.querySelectorAll(".list");




function accordion(e) {
  e.stopPropagation();

  if (this.classList.contains("active")) {
    this.classList.remove("active");
  } else if (this.parentElement.parentElement.classList.contains("active")) {
    this.classList.add("active");
  } else {
    for (i = 0; i < list.length; i++) {
      list[i].classList.remove("active");
    }

    this.classList.add("active");
  }
}

for (i = 0; i < list.length; i++) {
  list[i].addEventListener("click", accordion);
}



questionmark.addEventListener("click", (e) => {
  searchbar.classList.toggle("show");
})

addEventListener("keyup", (event) => {
  if (event.key == 'Enter') {
    autoCompleteBox.classList.remove("show");
  }
})

closesearch.addEventListener("click", () => {
  searchbar.classList.toggle("show");
  autoCompleteBox.classList.remove("show");  
})




let all = document.querySelector(".all");
let research = document.querySelector(".research");
let news = document.querySelector(".news");
let production = document.querySelector(".production");
let blog = document.querySelector(".blog");


all.addEventListener("click" , ()=>{
  n = false;
  data1.then(data => {

    news.classList.remove("selected");
  all.classList.toggle("selected");
  research.classList.remove("selected");
production.classList.remove("selected");
blog.classList.remove("selected");
loadData({gotData:data});
});
})

let researchtags = document.querySelector(".research").innerHTML;
let newstags = document.querySelector(".news").innerHTML;
let productiontags = document.querySelector(".production").innerHTML;
let blogtags = document.querySelector(".blog").innerHTML;

function researchContent(researchtags, data){
  let researchData = data.filter(tcs =>{
    const regex = new RegExp(`^${researchtags}` , 'gi');
    return tcs.tag.match(regex) 
  });
  return researchData;
}
function newsContent(newstags, data){
  let newsData = data.filter(tcs =>{
    const regex = new RegExp(`^${newstags}` , 'gi');
    return tcs.tag.match(regex) 
  });
  return newsData;
}
function productionContent(productiontags, data){
  let productionData = data.filter(tcs =>{
    const regex = new RegExp(`^${productiontags}` , 'gi');
    return tcs.tag.match(regex) 
  });
  return productionData;
}
function blogContent(blogtags, data){
  let blogData = data.filter(tcs =>{
    const regex = new RegExp(`^${blogtags}` , 'gi');
    return tcs.tag.match(regex) 
  });
  return blogData;
}

let res = false;
let ne = false;
let blo = false;
let pro = false;

research.addEventListener("click", ()=>{
  res = true;
  n = false;
  document.getElementById("data-container").innerHTML = "";
  research.classList.toggle("selected");
  all.classList.remove("selected");
  data1.then(data => {
    let researchData=[];
    if(research.classList.contains("selected")){
      researchData.push(...researchContent(researchtags, data));
    }
    if(news.classList.contains("selected")){
      researchData.push(...newsContent(newstags, data));
    }
    if(production.classList.contains("selected")){
      researchData.push(...productionContent(productiontags, data));
    }
    if(blog.classList.contains("selected")){
      researchData.push(...blogContent(blogtags, data));
    }
    if(research.classList.contains("selected") == false && news.classList.contains("selected") ==false && production.classList.contains("selected") == false && blog.classList.contains("selected") == false ){
      researchData.push(...data)
    }
    loadData({gotData:researchData});
  })
  
})

news.addEventListener("click", ()=>{
  ne = true;
  n = false;
  document.getElementById("data-container").innerHTML = "";
  
  news.classList.toggle("selected");
  all.classList.remove("selected");
  data1.then(data => {
    let newsData=[];
    if(research.classList.contains("selected")){
      newsData.push(...researchContent(researchtags, data));
    }
    if(news.classList.contains("selected")){
      newsData.push(...newsContent(newstags, data));
    }
    if(production.classList.contains("selected")){
      newsData.push(...productionContent(productiontags, data));
    }
    if(blog.classList.contains("selected")){
      newsData.push(...blogContent(blogtags, data));
    }
    if(research.classList.contains("selected") == false && news.classList.contains("selected") ==false && production.classList.contains("selected") == false && blog.classList.contains("selected") == false ){
      newsData.push(...data)
    }
    loadData({gotData:newsData});
  })
  
})

production.addEventListener("click", ()=>{
  pro = true;
  n = false;
  document.getElementById("data-container").innerHTML = "";
  
  production.classList.toggle("selected");
  all.classList.remove("selected");
  data1.then(data => {
    let productionData=[];
    if(research.classList.contains("selected")){
      productionData.push(...researchContent(researchtags, data));
    }
    if(news.classList.contains("selected")){
      productionData.push(...newsContent(newstags, data));
    }
    if(production.classList.contains("selected")){
      productionData.push(...productionContent(productiontags, data));
    }
    if(blog.classList.contains("selected")){
      productionData.push(...blogContent(blogtags, data));
    }
    if(research.classList.contains("selected") == false && news.classList.contains("selected") ==false && production.classList.contains("selected") == false && blog.classList.contains("selected") == false ){
      productionData.push(...data)
    }
    loadData({gotData:productionData});
  })
})

blog.addEventListener("click", ()=>{
  n = false;
  blo = true;
  document.getElementById("data-container").innerHTML = "";
  
  blog.classList.toggle("selected");
  all.classList.remove("selected");
  data1.then(data => {
    let blogData=[];
    if(research.classList.contains("selected")){
      blogData.push(...researchContent(researchtags, data));
    }
    if(news.classList.contains("selected")){
      blogData.push(...newsContent(newstags, data));
    }
    if(production.classList.contains("selected")){
      blogData.push(...productionContent(productiontags, data));
    }
    if(blog.classList.contains("selected")){
      blogData.push(...blogContent(blogtags, data));
    }
    if(research.classList.contains("selected") == false && news.classList.contains("selected") ==false && production.classList.contains("selected") == false && blog.classList.contains("selected") == false ){
      blogData.push(...data)
    }
    loadData({gotData:blogData});
  })
})

const searchAuto = searchText =>{
  data1.then(data => {

    let autoData = data.filter(tcs =>{
      const regex = new RegExp(`^${searchText}` , 'gi');
      return tcs.title.match(regex) || (tcs.title.toLowerCase().includes(searchText.toLowerCase()))
    });
    var autoload = {
      gotData : autoData
    }
    // console.log(autoload);
  })
}

//nav color change
let myNav = document.querySelector('.mynav');
window.addEventListener("scroll" , ()=> { 
  // console.log(myNav)
  console.log(document.body)
    if (window.scrollY >= 80 ) {
        myNav.classList.add("mynavclr");
        myNav.classList.remove("mynav");
        // console.log(document.body.scrollHeight)   
        // console.log(window.innerHeight)
        // console.log(window.scrollY);
    }
    if(window.scrollY <= 80 ) {
        myNav.classList.add("mynav");
        myNav.classList.remove("mynavclr");
    }
});


let activeClass1 = document.querySelector(".hover1");
// console.log(activeClass)
activeClass1.addEventListener("mouseover",()=> {
  activeClass1.classList.add("active")
});
activeClass1.addEventListener("mouseleave", ()=> {
    activeClass1.classList.remove("active")
});


let activeClass2 = document.querySelector(".hover2");
// console.log(activeClass)
activeClass2.addEventListener("mouseover",()=> {
  activeClass2.classList.add("active")
});
activeClass2.addEventListener("mouseleave", ()=> {
    activeClass2.classList.remove("active")
});

let activeClass3 = document.querySelector(".hover3");
// console.log(activeClass)
activeClass3.addEventListener("mouseover",()=> {
  activeClass3.classList.add("active")
});
activeClass3.addEventListener("mouseleave", ()=> {
    activeClass3.classList.remove("active")
});

let activeClass4 = document.querySelector(".hover4");
// console.log(activeClass)
activeClass4.addEventListener("mouseover",()=> {
  activeClass4.classList.add("active")
});
activeClass4.addEventListener("mouseleave", ()=> {
    activeClass4.classList.remove("active")
});
































































