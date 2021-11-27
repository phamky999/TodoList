import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../../assets/css/Albums.css";
import ContactContext from "../../store/contact-context";
export default function Albumsv2() {
  const [albumsState, setAlbumsState] = useState([]);

  const contactCtx = useContext(ContactContext);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        if (response) {
          const data = response.data.map((item) => {
            let user = contactCtx.contacts.find(
              (element) => element.id === item.userId
            );
            if (user) {
              return {
                id: item.id,
                username: user.name,
                title: item.title,
              };
            } else {
              return {
                id: item.id,
                username: "",
                title: item.title,
              };
            }
          });
          setAlbumsState(data);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchAlbums();
    // axios.get('https://jsonplaceholder.typicode.com/albums')
  }, [contactCtx.contacts]);

  console.log(typeof albumsState);
  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="album-box">
        <div className="title">
          <h3>Albums</h3>
          <div className='description'>Load More</div>
          <span></span>
        </div>
        <div className="body">
          {albumsState.map((item) => (
            <div key={item.id} className="card album-item">
              <h3>{item.username}</h3>
              <div> {item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
