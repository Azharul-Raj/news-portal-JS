
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
  const catArr = []
    const categoryContainer = document.getElementById('category')
    categories.forEach(category => {
      const { category_name, category_id } = category
      const span = document.createElement('span')
      span.classList.add('me-4')
      span.innerHTML = `
      
      <button id="btn" onclick="loadBlogs('${category_id}')" class="border border-0 bg-transparent">${category_name}</button>
      
      `
      categoryContainer.appendChild(span)
      // loading(true)
      categoryName = category_name
      
    })
  }
// spinner part start
const loading = async(isLoading) => {
  const loading = document.getElementById('loading')
  if (isLoading === true) {
    loading.classList.remove('d-none')
    console.log('if')
  }
  else {
    console.log('else')
    loading.classList.add('d-none')
  }
  // loading.textContent = ''
}
// spinner part end
loadCategory()
// load blog part
const loadBlogs = async (id) => {
  if (id) {
    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
      const data = await res.json()
      displayBlogs(data.data, data.status)
      // loading(true)
  }
  catch (error) {
      console.log(error)
  }
  }
  else {
    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/news/category/01`)
      const data = await res.json()
      displayBlogs(data.data,data.status)
  }
  catch (error) {
      console.log(error)
  }
  }
}
// display blogs part
const displayBlogs =  (blogs, status) => {
  const blogLength = blogs.length
  console.log(status)
  // blog length showing part start
  const blogList = document.getElementById('blog-list')
  const showLengthContainer = document.getElementById('show-avilable')
  showLengthContainer.textContent = ``
  if (blogLength > 0) {
    console.log('if')
    showLengthContainer.innerHTML = `
    <h2>${blogLength}  news found..</h2>
    `
  }
  else {
    console.log('i am here')
    showLengthContainer.innerHTML = `
    <h2>No  news found</h2>
    `
  }
  // get total views
  // const view = []
  // array shorting here
  blogs.sort(function (a,b) {
    return b.total_view -a.total_view
  })
  // array shorting here
  blogList.textContent = ''
    blogs.forEach(blog => {
        console.log(blog)
        const { image_url, title, details, author, total_view, _id, thumbnail_url } = blog
        const { img, name, published_date } = author
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-3 shadow-lg count" style="max-width: 1240px;">
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
                   <div class="col-lg-4 col-sm-4">
                      <!-- author details showing part start -->
                      <div class="row">
                        <div class="col-md-2 col-sm-2">
                          <img style="height:30px; width:30px" class="rounded-circle" src="${img}" alt="">
                        </div>
                        <div class="col-md-10 col-sm-10">
                         <p class="fw-bold">${name? name:'No Data Found'}</p>
                         <p class="date">${published_date? published_date: 'No Data Found'}</p>
                        </div>
                      </div>
                      <!-- author details showing part end -->
                   </div>
                    <div class="col-lg-4 col-sm-4">
                      <p><i class="fa-solid fa-eye"></i> ${total_view?total_view:'No Views'}</p>
                    </div>
                    <div class="col-lg-4 col-sm-4 justify-content-end">
                      <button onclick="loadDetails('${_id}')" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
      
      loading(false)
      // blog length showing part end
    })
    // sorting 
    // loading(false)
}

// load author info function
const loadDetails = async (id) => {
  try {
      const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`)
      const data = await res.json()
      showDetails(data.data[0])
  }
  catch (error) {
      console.log(error)
  }
}
// show details function
const showDetails = async (singleData) => {
  const { title, author, details, thumbnail_url, total_view } = singleData
  const { name, published_date } = author
  console.log(name, published_date)
  const detailsModal = document.getElementById('show-details')
  detailsModal.innerHTML = `
       <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body">
         <img style="height:350px" class="image-fluid w-100" src="${thumbnail_url}" alt="">
         <!-- author details && publish date side by side -->
         <div class="d-flex justify-content-around">
           <p class="fw-bold">Author : ${name?name:'no name found'}</p>
           <p><i class="fa-solid fa-eye"></i> ${total_view?total_view:'no views'}</p>
           <p><i class="fa-sharp fa-solid fa-clock"></i> ${published_date?published_date:'no date found'}</p>
           </div>
           <p>${details}</p>
         <!-- author details && publish date side by side -->
       </div>
     </div>
  `
}


loadBlogs()

// complete