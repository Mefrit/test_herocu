import * as React from "react"

import { RegistrationComponent } from "./components/registration";
import { Scene } from "./components/scene";



export class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            enter: false,
            id_curent_user: 25,
        };
    }
    setEnter = (id_curent_user) => {
        this.setState({
            enter: true,
            id_curent_user: id_curent_user,
        });
    };
    render() {
        return (
            <div className="container">
                {this.state.enter ? (
                    <Scene id_curent_user={this.state.id_curent_user} />
                ) : (
                    <RegistrationComponent setEnter={this.setEnter} />
                )}
            </div>
        );
    }
}

