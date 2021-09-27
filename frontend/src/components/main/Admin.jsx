import React,{useContext} from 'react'
import Button from '../sub/Button'
import Header from './Header'
const Admin = () => {

    return (
        <div className="container">
            <Header/>
            <Button>Hello</Button>
            <h1>Admin</h1>
        </div>
    )
}

export default Admin
