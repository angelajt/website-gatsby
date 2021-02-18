import React, { useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"


const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const blogTitle = data.site.siteMetadata?.blogTitle || `Title`
  const { previous, next } = data
  const tags = post.frontmatter.tags || []
  const commentsWrapper = useRef();
  useEffect(() => {
    const wrapper = commentsWrapper.current;
    if (wrapper) {
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("repo", "angelajt/blog");
      script.setAttribute("issue-term", post.frontmatter.title);
      script.setAttribute("label", "comment");
      script.setAttribute("theme", "github-light");

      wrapper.appendChild(script);

      return () => {
        while (wrapper.firstChild) {
          wrapper.removeChild(wrapper.lastChild);
        }
      };
    }
  }, [post.frontmatter.title]);

  return (
    <Layout location={location} title={blogTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date} <span className="time">/ {post.frontmatter.time}</span></p>
        </header>
        <div>
          <Tags>{tags}</Tags>
        </div>
        <section class="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <div ref={commentsWrapper} />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        blogTitle
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date: date(formatString: "MMMM DD, YYYY")
        time: date(formatString: "HH:mm")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
