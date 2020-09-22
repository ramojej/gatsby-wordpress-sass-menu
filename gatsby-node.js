const path = require("path")

const query = `
{
  allWpPage {
    nodes {
      uri
      template {
        ... on WpHomeTemplateTemplate {
          templateName
        }
        
      }
      isFrontPage
      id
    }
  }
}
`

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    ${query}
  `)

  //return null
  if (!data) return null

  data.allWpPage.nodes.forEach(page => {
    const { isFrontPage } = page
    const uri = isFrontPage ? `/` : page.uri

    actions.createPage({
      path: uri,
      component: isFrontPage
        ? path.resolve("./src/templates/Home.js")
        : path.resolve("./src/templates/BasicPage.js"),
      context: {
        id: page.id,
        slug: page.uri,
      },
    })
  })
}
