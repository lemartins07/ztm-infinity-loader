const imageContainer = document.getElementById("image-container")
const loader = document.getElementById('loader')

let photosArray = []
let ready = false
let imagesLoadedCount = 0
let totalImages = 0

// Unsplash API
const count = 30
const apiKey = ''

const API_URL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
const MOCKED_API = 'photos.json'

function imageLoaded() {
  imagesLoadedCount++
  if (imagesLoadedCount === totalImages) {
    loader.hidden = true
    ready = true
  }
}

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhotos() {
  imagesLoadedCount = 0
  totalImages = photosArray.length

  photosArray.forEach(item => {
    // Create link
    const a = document.createElement('a')
    setAttribute(a, {
      href: item.links.html,
      target: '_blank'
    })

    // Create img
    const img = document.createElement('img')
    setAttribute(img, {
      src: item.urls.regular,
      alt: item.alt_description,
      title: item.alt_description
    })

    img.addEventListener('load', imageLoaded)

    // Inset img into link
    a.appendChild(img)

    // Inset link into image container
    imageContainer.appendChild(a)
  })

}

async function getPhotos() {
  try {
    const response = await fetch(MOCKED_API)
    const data = await response.json()
    photosArray = data
    displayPhotos()
  } catch (error) {
    console.log(error)
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos();
  }
})

getPhotos();