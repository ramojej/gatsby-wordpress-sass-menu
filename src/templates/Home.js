import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Home = ({ data: { wpPage } }) => {
  console.log(wpPage)
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      content
      uri
    }
  }
`

export default Home
