// SW Version
const version = '1.0'

// Static Cache - App Shell
const appAssets = [
  'index.html',  
  'js/classes/comps/bar.js',
  'js/classes/comps/scoreBox.js',
  'js/classes/mc/controller.js',
  'js/classes/mc/model.js',
  'js/classes/ui/flatButton.js',
  'js/classes/ui/soundButtons.js',
  'js/classes/ui/toggleButton.js',
  'js/classes/util/align.js',
  'js/classes/util/alignGrid.js',
  'js/classes/util/collision.js',
  'js/classes/util/mediaManager.js',
  'js/classes/road.js',
  'js/scenes/sceneLoad.js',
  'js/scenes/sceneMain.js',
  'js/scenes/sceneOver.js',
  'js/scenes/sceneTitle.js',
  'js/constants.js',
  'js/main.js',
  'js/phaser.min.js',
  'images/ui/buttons/1/1.png',
  'images/ui/buttons/1/2.png',
  'images/ui/buttons/1/3.png',
  'images/ui/buttons/1/4.png',
  'images/ui/buttons/1/5.png',
  'images/ui/buttons/1/6.png',
  'images/ui/buttons/2/1.png',
  'images/ui/buttons/2/2.png',
  'images/ui/buttons/2/3.png',
  'images/ui/buttons/2/4.png',
  'images/ui/buttons/2/5.png',
  'images/ui/buttons/2/6.png',
  'images/ui/icons/music_off.png',
  'images/ui/icons/music_on.png',
  'images/ui/icons/sfx_off.png',
  'images/ui/icons/sfx_on.png',
  'images/ui/toggles/1.png',
  'images/ui/toggles/2.png',
  'images/ui/toggles/3.png',
  'images/ui/toggles/4.png',
  'images/ui/toggles/5.png',
  'images/ui/toggles/6.png',
  'images/barrier.png',
  'images/cars.png',
  'images/cone.png',
  'images/icon.png',
  'images/line.png',
  'images/pcar1.png',
  'images/pcar2.png',
  'images/road.jpg',
  'images/title.png',
  'images/titleBack.jpg',
  'audio/boom.mp3',
  'audio/boom.ogg',
  'audio/musicLoop.mp3',
  'audio/random-race.mp3',
  'audio/random-race.ogg',
  'audio/whoosh.mp3',
  'audio/whoosh.ogg'
]

// SW Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(`static-${version}`)
      .then(cache => cache.addAll(appAssets))
  )
})

// SW Activate
self.addEventListener('activate', e => {
  // Clean static cache
  let cleaned = caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== `static-${version}` && key.match('static-')) {
        return caches.delete(key)
      }
    })
  })
  e.waitUntil(cleaned)
})

// SW Fetch
self.addEventListener('fetch', e => {
  // App shell
  if (e.request.url.match(location.origin)) {
    e.respondWith(staticCache(e.request))
  }
})

// Static cache strategy - Cache First / Cache with Network Fallback
const staticCache = req => {
  return caches.match(req).then(cacheRes => {
    
    // Return cached response if found
    if(cacheRes) return cacheRes

    // Fall back to network
    return fetch(req).then(networkRes => {

      // Update cache with new response
      caches.open(`static-${version}`)
      .then(cache => cache.put(req, networkRes))

      // Return Clone of Network Response
      return networkRes.clone()
    })

  })
}