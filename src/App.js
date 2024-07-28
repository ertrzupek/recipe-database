import React from "react";
import './App.css';
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
        fetch("http://localhost:3001/recipes")
        .then(res => res.json())
        .then(json => setData(json.recipes));
    }, []);
    const incFunct = (event) => {
        event.preventDefault();
        fetch("http://localhost:3001/recipes", {
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