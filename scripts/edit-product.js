const editCardBlock = document.getElementById('editCardBlock')
const formItems = document.getElementsByClassName('form__item')
let product = null
const editForm = document.getElementById('editForm')

const name = formItems[0]
const price = formItems[1]
const sale = formItems[2]
const bestseller = formItems[3]
const image = formItems[4]
const categoryId = formItems[5]

const id = location.search.replace('?id=', '')
const saveChangeBtn = document.getElementById('changeBtn')

async function getProduct() {
    const response = await fetch(`http://localhost:3000/posts/${id}`)
        .then((response) => response.json())
        .then((json) => (json));
    // console.log(res/ponse);
    product = response
    drawProduct(response)
}

function drawProduct(product) {
    console.log(formItems);

    name.value = product.name
    price.value = product.price
    sale.value = product.sale
    bestseller.checked = product.bestseller
    categoryId.value = product.categoryId

    editCardBlock.innerHTML += `
        <div class="edit-card__img-block">
            <img src=${product.img} />
        </div>
    `
}

getProduct()
console.log(formItems);

saveChangeBtn.onclick = async (e) => {
    e.preventDefault()

    const formItems = document.getElementsByClassName('form__item')

    const name = formItems[0].value
    const price = formItems[1].value
    const sale = formItems[2].value
    const bestseller = formItems[3].checked
    const image = formItems[4]
    const categoryId = formItems[5].value

    if (name.trim().length < 1) {
        return alert('не заполнено поле "name"')
    }
    if (price.length < 1 || !(price > 0)) {
        return alert('неверно заполнена форма "price"')
    }
    if (sale >= 99 || sale < 0) {
        return alert('значение должно быть в диапозоне от 1% до 99%')
    }
    if (Number(categoryId) === 0) {
        return alert('не выбрана категория')
    }

    const chabgedBody = {
        name,
        price,
        sale,
        categoryId: Number(categoryId),
        image: product.image,
        bestseller,
    }

    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(chabgedBody),
    })
    const data = await response.json()
    console.log(data);
}