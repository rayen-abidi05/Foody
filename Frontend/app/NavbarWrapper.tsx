"use client"

import Navbar from "../components/Navbar"
import UserNavbar from "../components/UserNavbar"






export default function NavWrapper({ islogged }: { islogged: boolean }) {
  return islogged ? <UserNavbar /> : <Navbar />
}