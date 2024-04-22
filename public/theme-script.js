let theme = 'dark'

try {
    let store = JSON.parse(localStorage.getItem('ui'))
    theme = store.state.theme
    if (!['dark', 'light'].includes(theme)) throw new Error("Can't load theme")
  } catch (error) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches)
      theme = 'light'
  }
  
  document.documentElement.setAttribute('data-theme', theme)
  