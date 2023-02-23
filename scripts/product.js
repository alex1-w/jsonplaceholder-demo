const id = location.search.replace('?id=', '')
// что такое location serch

async function getProduct() {
    const response = await fetch(`http://localhost:3000/posts/${id}`)
        .then((response) => response.json())
        .then((json) => (json));
    drawProduct(response)
}

const cardBlock = document.querySelector('.product-block')

getProduct()

function drawProduct(product) {
    cardBlock.innerHTML = ``

    console.log(product);
    cardBlock.innerHTML += `
        <div class="product-block__wrapper">
                <div class="product-block__main-block">

                    <div class="product-block__image">
                        <img src="${product.img}" alt="">
                    </div>

                    <div class="product-block__description">
                        <div class="product-block__title">
                            <p></p>
                        </div>

                        <div class="product-block__description_content">
                            <p class="">${product.price}</p>
                            <p class="">${product.sale}</p>
                            <p class="">${product.views}</p>
                            <p></p>
                        </div>

                    </div>
                    <div class="product-block__edition"></div>
                </div>

                <div class="product-block__footer">

                </div>
            </div>
        `
}