
import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';


export default function welcome(){

  return(
    <main>
        <Link href="../App#">
          Go to Client-Side Component
        </Link>
    </main>
  )
}