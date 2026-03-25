import React from "react"
import ReactDOM from "react-dom"
import AccessibilityWidget from "./accessibility/ui/AccessibilityWidget"

window.renderAccessibilityWidget = (element) => {
  ReactDOM.render(
    React.createElement(AccessibilityWidget),
    element
  )
}