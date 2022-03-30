
let container = document.querySelector('.container');
let title = document.createElement('h1');
title.innerHTML = "Search highlight";
container.appendChild(title)
let search = document.createElement('div');
search.setAttribute('class','search');
let apps = document.createElement('div');
apps.className = "apps__search";
container.appendChild(apps);
apps.appendChild(search);

// search 
let input = document.createElement('input');
input.type = "text";
input.placeholder = "search"
input.setAttribute('id','searchInput');
search.appendChild(input)
// button search
let btnSearch = document.createElement('button');
btnSearch.setAttribute('id','searchBtn');
btnSearch.innerHTML = "Search";
search.appendChild(btnSearch);

// tombol ketika sudah mendapatkan apa yang kita mencari
let spanContainer = document.createElement('span');
spanContainer.className = "found";
search.appendChild(spanContainer);
let btnPrev = document.createElement('button');
btnPrev.setAttribute('id','prev');
btnPrev.innerHTML = "&#60";
let btnNext = document.createElement('button');
btnNext.setAttribute('id','next');
btnNext.innerHTML = "&#62";
spanContainer.appendChild(btnPrev);
spanContainer.appendChild(btnNext);
let label = document.createElement('label');
label.innerHTML = "0"
label.setAttribute('id','position') 
let label2 = document.createElement('label');
label2.innerHTML = "0";
label2.setAttribute('id','total');
spanContainer.appendChild(label);
spanContainer.appendChild(label2)

// membuat isi sebuah content
let content = document.createElement('div');
content.setAttribute('id','content');
apps.appendChild(content);
for(let i = 0; i < 10; i++){
    let pLorem = document.createElement('p');
    pLorem.innerHTML = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, tenetur!"
    content.appendChild(pLorem)
}
// manipulasi data
let elementContent = document.getElementById('content');
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');
let found = document.querySelector('.found');
let position = document.getElementById('position');
let total = document.getElementById('total');
let originalSring = elementContent.innerHTML;
let highlightEle = document.getElementsByClassName('highlight');
let BtnNext = document.getElementById('next');
let BtnPrev = document.getElementById('prev');

function highlight(element,originalSring,searchFunc){
    if(searchFunc.length > 0) {
        let regex = new RegExp(searchFunc, "gi");
        let newString = originalSring.replace(regex, "<span class='highlight'>" + searchFunc + "</span>");
        element.innerHTML = newString;
    }else{
        // tidak mencari apapun
        element.innerHTML = originalSring;
    }
}

function foundWords(){
    if(highlightEle.length > 0){
        // menampilkan button prev dan next
        found.style.display = "inline";
        // Jumlah kata yang ditemukan
        total.innerText = highlightEle.length; 
        indicator(1)
    }else{
        found.style.display = "none";
    }
}


function indicator(currentPosition){
    if(currentPosition > highlightEle.length || currentPosition == 0){
        // kalau di akhir atau diawal kalimat pencarian tidak bisa next atau prev lagi
        return false;
    }
    removeCurrentIndicator();

    highlightEle[currentPosition - 1].id = currentPosition;
    highlightEle[currentPosition - 1].classList.add('active');
    position.innerHTML = currentPosition
    // pindah posisi saat ini
    window.location.hash = '#' + currentPosition
}
BtnPrev.addEventListener('click', prev);
function prev(){
    indicator(parseInt(position.innerText) - 1)
}
BtnNext.addEventListener('click', next);
function next(){
    indicator(parseInt(position.innerHTML) + 1);
}

function removeCurrentIndicator(){
    if(highlightEle[parseInt(position.innerText) - 1]){
        highlightEle[parseInt(position.innerText) - 1].classList.remove('active');
    }
}
searchBtn.addEventListener('click', () => {
    highlight(elementContent,originalSring,searchInput.value);
    foundWords()
});




