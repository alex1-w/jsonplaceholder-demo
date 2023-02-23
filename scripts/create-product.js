const btnCreate = document.getElementById('btnCreate')
const getImage = document.getElementById('getImage')
let link = ``

getImage.onchange =  (e) => {
    console.log(e);
    const image = e.target.files[0]
    link = URL.createObjectURL(image)

    const loadImage = document.getElementById('load-image')
    loadImage.innerHTML = `
    <div> <img src=${link} /></div>
    `
}

btnCreate.onclick = (e) => {
    e.preventDefault()

    const formItems = document.getElementsByClassName('form__item')
    const name = formItems[0].value
    const price = formItems[1].value
    const discount = formItems[2].value
    const bestseller = formItems[3].checked
    const categoryId = formItems[5].value


    if (name.trim().length < 1) {
        return alert('не заполнено поле "name"')
    }
    if (price.length < 1 || !(price > 0)) {
        return alert('неверно заполнена форма "price"')
    }
    if (discount >= 99 || discount < 0) {
        return alert('значение должно быть в диапозоне от 1% до 99%')
    }
    if (Number(categoryId) === 0) {
        return alert('не выбрана категория')
    }

    const body = {
        name,
        price,
        sale: discount,
        categoryId: Number(categoryId),
        bestseller,
        views: 0,
        img: link,
    }

    // post - создание
    // delete - удалить
    // put - редактировать
    //  get - получить
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => window.location.href = `/product.html?id=${json.id}`);
}

