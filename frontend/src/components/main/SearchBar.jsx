import React from 'react'
import Input from '../sub/Input'
import Button from "../sub/Button"
import {FaSearch} from "react-icons/fa"
const SearchBar = () => {
    return (
        <form className="search-bar__container">
            <div className="search-input__container">
                <Input className="search-input" placeholder="What book are you looking for?"/>
            </div>
            <div className="search-button">
                <Button className="btn"><FaSearch /></Button>
            </div>
        </form>
    )
}

export default SearchBar
