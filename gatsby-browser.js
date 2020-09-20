import React from "react"
import Layout from "./src/components/layout"
import "normalize.css"
import "./src/styles/main.scss"

export const wrapRootElement = ({ element }) => {
  return <Layout>{element}</Layout>
}
