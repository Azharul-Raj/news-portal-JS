// category api call
const loadCategory = async() => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await res.json()
        displayCategory(data.data.news_category)
    }
    catch (error) {
        console.log(error)
    }
}
const displayCategory = async (categories) => {
    const categoryContainer = document.getElementById('category')
    categories.forEach(category => {
        const { category_name, category_id } = category
        const span = document.createElement('span')
        span.classList.add('me-4')
        span.innerHTML = `
        
        <button onclick="loadBlogs('${category_id}')" class="border border-0 bg-transparent">${category_name}</button>
        `
        categoryContainer.appendChild(span)
    })
}

loadCategory()
// load blog part
const loadBlogs = async (id) => {
    console.log(id)
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        const data = await res.json()
        displayBlogs(data.data)
    }
    catch (error) {
        console.log(error)
    }
}
// display blogs part
const displayBlogs = async (blogs) => {
    console.log(blogs)
}