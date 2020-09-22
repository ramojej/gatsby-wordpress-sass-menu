import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import UniversalLink from "../../utils/UniversalLink"
import { flatListToHierarchical } from "../../utils/flatListToHierarchical"
import { FiChevronDown } from "react-icons/fi"

const MobileMenu = () => {
  const { wpMenu } = useStaticQuery(graphql`
    {
      wpMenu(slug: { eq: "gatsby-primary-menu" }) {
        name
        menuItems {
          nodes {
            key: id
            title: label
            path
            parentId
            url
            connectedNode {
              node {
                uri
              }
            }
          }
        }
      }
    }
  `)

  const headerMenu = flatListToHierarchical(wpMenu.menuItems.nodes)

  const [subMenuOpen, setSubMenuOpen] = useState(false)

  return (
    <nav className="mobile_menu_wrapper">
      <ul>
        {headerMenu.map(menuItem => {
          const path =
            menuItem.connectedNode !== null
              ? menuItem.connectedNode.node.uri
              : menuItem.url

          return (
            <li
              key={menuItem.key}
              className={
                menuItem.children.length > 0 ? "has-submenu menu" : "menu"
              }
            >
              <div className="menu_link_wrap">
                <UniversalLink to={path} activeClassName="active">
                  {menuItem.title}
                </UniversalLink>
                {menuItem.children.length > 0 && (
                  <FiChevronDown
                    className="submenu_toggle"
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                )}
              </div>

              {menuItem.children.length > 0 && (
                <ul
                  className={`submenu ${subMenuOpen ? "submenu--visible" : ""}`}
                >
                  {menuItem.children.map(subItem => {
                    //console.log(subItem)
                    return (
                      <li key={subItem.key}>
                        <UniversalLink
                          to={
                            subItem.connectedNode
                              ? subItem.connectedNode.node.uri
                              : subItem.url
                          }
                          activeClassName="submenu-active"
                        >
                          {subItem.title}
                        </UniversalLink>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MobileMenu
