import React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
    return <div>这是App</div>
}

const root = createRoot(document.getElementById('app'))

root.render(<App />)