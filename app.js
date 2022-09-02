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
        loading(true)
    })
}
// spinner part start
const loading = (isLoading) => {
  const loading = document.getElementById('loading')
  if (isLoading === true) {
    loading.classList.remove('d-none')
    console.log('if')
  }
  else {
    console.log('else')
    loading.classList.add('d-none')
  }
  loading.textContent = ''
}
// spinner part end
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
  const blogList = document.getElementById('blog-list')
  blogList.textContent = ''
    blogs.forEach(blog => {
        console.log(blog)
        const { image_url, title, details, author, total_view, _id, thumbnail_url } = blog
        const { img, name, published_date } = author
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-3 shadow-lg" style="max-width: 1040px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.length > 200? details.slice(0,200)+'....': details}</p>
                <!-- card footer part start -->
                <div class="row">
                   <div class="col-lg-4">
                      <!-- author details showing part start -->
                      <div class="row">
                        <div class="col-md-2">
                          <img style="height:30px; width:30px" class="rounded-circle" src="${img}" alt="">
                        </div>
                        <div class="col-md-10">
                         <p class="fw-bold">${name? name:'no name found'}</p>
                         <p class="date">${published_date? published_date: 'date is not avilable'}</p>
                        </div>
                      </div>
                      <!-- author details showing part end -->
                   </div>
                    <div class="col-lg-4">
                      <p><i class="fa-solid fa-eye"></i> ${total_view}</p>
                    </div>
                    <div class="col-lg-4 justify-content-end">
                      <button onclick="showDetails(${_id})" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                         View Details <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                </div>
                <!-- card footer part end -->
            </div>
          </div>
        </div>
      </div>
        `
        blogList.appendChild(div)
    })
  loading(false)
}

// modal showing function
const showDetails = async (id) => {
  console.log(id)
  try {
      const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`)
      const data = await res.json()
      displayBlogs(data.data)
  }
  catch (error) {
      console.log(error)
  }
}