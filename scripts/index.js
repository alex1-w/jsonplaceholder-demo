// помнить про _ в названии .scss-файлов
// json-server --warch bin.js db.json

const cardBlock = document.querySelector('.card-block')

async function getProducts() {
    const response = await http.get('/posts')
    drawProducts(response.data)
    console.log(response);
}
getProducts()

function drawProducts(products) {
    cardBlock.innerHTML = ``

    products.map(card => {
        cardBlock.innerHTML += `
        <div class="cards__item">
            <a class="cards__item_image" href='product.html?id=${card.id}'>

                ${card.bestseller ? `<div class="cards__item_bestseller">hit</div>` : ``}
                <img src="${card.img}" alt=${card.name}>

               <div class="cards__item_name"> <p>${card.name}</p></div>
            </a>  
            <div class="cards__item_content">

                <div class="cards__item_bottom">

                    <div class="cards__item_prices">
    
                        <p class="cards__item_content_price">${card.price}р</p> 
                        ${card.sale ? `<p class="cards__item_content_sale-price">${card.sale}%</p>` : ``}\

                    </div>

                    <div class="cards__item_btns">
                        <button onclick="deleteCard(${card.id})"> 
                            <img src="imgs/trash.svg" alt="trash">
                        </button>       

                        <button onclick="editCard(${card.id})">
                            <img src="./imgs/edit.svg" class="cards__edit" />
                        </button>
                    </div>
                     
                </div>     
                
             </div>
        </div>`
    })
}
// window.location.href= - поменяет ссылку в браузере

async function removePost(id) {
    http.delete(`/posts/${id}`).then((response) => console.log(response))
}

const btnAddPost = document.getElementById('btnAddPost')
btnAddPost.onclick = async () => {
    const inputs = document.querySelectorAll('.input-card')
    const cardTitle = inputs[0].value
    const cardAuthor = inputs[1].value

    if (cardTitle.length < 1 || cardAuthor.length < 1) {
        return console.log('не заполнено');
    }

    const response = await http.post('/posts', { title: cardTitle, author: cardAuthor })
    console.log(response);
}

function deleteCard(id) {
    fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
    });
}

function editCard(id) {
    window.location.href = `/edit-product.html?id=${id}`
}