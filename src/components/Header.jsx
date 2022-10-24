import React, { Component } from 'react'

function Header() {
    return (
        <div class="header">
            <img 
							src={require("../images/new_logo.jpg")}
							class="newImg"
							alt="Flowbite Logo"
						/>
            <a href="#default" class="logo"> Quick Clean</a>

            <div class="header-right">
                <a  href="/">Home</a>
                <a href="/zones">Zones</a>
                <a href="/crews">Crews</a>
                <a href="/assigned"> Assigned</a>
                <a href="/toBeAssigns"> ToBeAssigns</a>
            </div>
        </div>
    )
}

export default Header