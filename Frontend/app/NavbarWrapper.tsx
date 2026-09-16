"use client"

import Navbar from "../components/Navbar"
import UserNavbar from "../components/UserNavbar"






export default function NavWrapper({ islogged }: { islogged: boolean }) {
  alert("islogged: " + islogged)
  return islogged ? <UserNavbar /> : <Navbar />
}