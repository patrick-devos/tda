import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously

  

  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")

    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>

            <li>
              <Link to="#" className=" ">
                <i className="bx bxs-dashboard"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li> 
              <Link to="/medewerkers/" className="has-arrow">
                <i className="bx bxs-contact"></i>
                <span>{props.t("Medewerkers")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/medewerkers/medewerkers">
                    {props.t("Medewerkers")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-game"></i>
                <span>{props.t("Core HR")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/corehr/optreden">{props.t("Optreden")}</Link>
                </li>
                <li>
                  <Link to="/corehr/promoties">{props.t("Promoties")}</Link>
                </li>
                <li>
                  <Link to="/corehr/klachten">{props.t("Klachten")}</Link>
                </li>
                <li>
                  <Link to="/corehr/waarschuwingen">
                    {props.t("Waarschuwingen")}
                  </Link>
                </li>
                <li>
                  <Link to="/corehr/exit-medewerkers">
                    {props.t("Exit medewerkers")}
                  </Link>
                </li>
                <li>
                  <Link to="/corehr/medewerkers-last-login">
                    {props.t("Medewerkers laatste keer ingelogd")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-building-house"></i>
                <span>{props.t("Organisatie")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/organisatie/aankondigingen">
                    {props.t("Aankondigingen")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bxs-timer"></i>
                <span>{props.t("Timesheet")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/timesheet/update-aanwezigheid">
                    {props.t("Update aanwezigheid")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/verlof" className=" ">
                <i className="bx bxs-timer"></i>
                <span>{props.t("Verlof beheren")}</span>
              </Link>
            </li>

            <li>
              <Link to="/rollen-beheren">
                <i className="bx bx-lock-alt"></i>
                <span>{props.t("Rollen beheren")}</span>
              </Link>
            </li>

            <li>
              <Link to="/training" className=" ">
                <i className="mdi mdi-weight-lifter"></i>
                <span>{props.t("Training")}</span>
              </Link>
            </li>

          
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
