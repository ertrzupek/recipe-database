import React from "react";
import './App.css';
//http://localhost:3001/recipes
//https://longhaired-skitter-peace.glitch.me/recipes
const Recipe = (props) => {

    var name = props.name;
    var id = props.id;
    var inc = props.inc
    return(
        <div className="counterchild">
            {name} - {id}<br/>
            increment: {inc}<br/>
            <button index-key = {id} onClick={props.incFunct}>add one to inc</button><br/>
            ----------------
        </div>
    ) 
}

const App = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_KEY)
        .then(res => res.json())
        .then(json => setData(json.recipes));
    }, []);
    const incFunct = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API_KEY, {
            method: "post",
            headers: {
                "action": 0,
                "index": event.target.getAttribute('index-key')
            },
        })
            .then(res => res.json())
            .then(json => setData(json.recipes))
    }
    return (
        <div id="container">
            ---------------- 
            {data.map((item,i) => {return(<Recipe key = {i} name = {item.name} id = {item.id} inc = {item.inc} incFunct = {incFunct}/>)})}
        </div>
    );
}

export default App;