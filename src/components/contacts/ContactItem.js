import React , {useState} from 'react'
import {Link} from 'react-router-dom'
export default function ContactItem(props) {
    const [showInfo, setShowInfo] = useState(false);

    const showInfoHandler = () =>{
        setShowInfo(prevState => !prevState);
    }
    const deleteItemHandler = () =>{
        props.onDelete();
    }
    return (
        <div className="contact-item card">
            <div className="item-title">
                <span>{props.name}</span>
                <i className={!showInfo ? 'bx bxs-chevron-down' : 'bx bx-chevron-up'} onClick={showInfoHandler} ></i>
                <i className='bx bxs-trash item--del'  onClick = {deleteItemHandler} ></i>
            </div>
            {showInfo && (<div className="item-body">
                <p>Email: {props.email}</p>
                <p>Phone: {props.phone}</p>
                <Link to={`/update-contact/${props.id}`}>Update Contact</Link>
            </div>)}
        </div>
    )
}
