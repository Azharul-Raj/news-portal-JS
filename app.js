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
const displayCategory = async (categorys) => {
    console.log(categorys)
}
loadCategory()