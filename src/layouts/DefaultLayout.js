import React from 'react'
import Navbar from '../components/navbar/Navbar'

export default function DefaultLayout(props) {
    return (
        <div className="app-layout">
            <Navbar />

            {props.children}
        </div>
    )
}
