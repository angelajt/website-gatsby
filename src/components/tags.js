import React from "react"
import {Link} from "gatsby"

const Tags = ({ children }) =>
  children && (
    <ul className="tags">
      {children.split(", ").map(t => (
        <li key={t}>
          <Link to={`/tagged/${t}`}>{t}</Link>
        </li>
      ))}
    </ul>
  )

export default Tags