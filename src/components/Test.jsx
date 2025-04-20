import { ThumbsDown } from 'lucide-react';
import React from 'react';

class Test extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: "COMPONENTE COM CLASSE"
        }
    }

    componentDidMount() {
        console.log("É EXECUTADO QUANDO O USUÁRIO ACESSA PELA PRIMEIRA VEZ");
    }

    render() {
        return <h1 className="text-white">{this.state.message}</h1>;
    }
}

export default Test;