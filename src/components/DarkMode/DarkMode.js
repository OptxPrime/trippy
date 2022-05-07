// Idea from https://aleksandarpopovic.com/Easy-Dark-Mode-Switch-with-React-and-localStorage/
import React from "react"
import "./DarkMode.css"

const DarkMode = () => {
  let clickedClass = "clicked"
  const body = document.body
  const lightTheme = "light"
  const darkTheme = "dark"
  let theme

  if (localStorage) {
    theme = localStorage.getItem("theme")
  }

  if(theme===darkTheme){
    body.classList.add(theme)
  }

  const switchTheme = e => {
    if(theme===darkTheme){
      body.classList.remove('dark')
      localStorage.setItem("theme","light")
      theme = lightTheme
    }else{
      body.classList.add('dark')
      localStorage.setItem("theme","dark")
      theme = darkTheme
    }
  }

  return (
    <button
      className={theme === "dark" ? clickedClass : ""}
      id="darkMode"
      onClick={e => switchTheme(e)}
    ></button>
  )
}

export default DarkMode