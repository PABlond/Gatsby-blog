import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

const IndexPage = ({ data }) => {
  console.log(data.allMarkdownRemark.edges[0].node.htmlAst)
  const content = data.allMarkdownRemark.edges.map(mod => {
    return {
      title: mod.node.frontmatter.title,
      id: mod.node.id,
      date: mod.node.frontmatter.date,
      excerpt: mod.node.excerpt,
      slug: mod.node.fields.slug
    }
  })
  return (
    <>
      <h1>Homepage</h1>
      {content.map(post => {
        return (
          <>
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <Link to={post.slug}>
              <p>{post.excerpt}</p>
            </Link>
          </>
        )
      })}
    </>
  )
}

export const pageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt(pruneLength: 100)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default IndexPage
