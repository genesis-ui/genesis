import React from "react";
import {Layout as ExampleLayout} from "../Layout";
import {Goto} from "../../../../Routing/Goto";

export class Welcome extends React.Component {
    render() {
        return (
            <React.StrictMode>
                <ExampleLayout>
                    Welcome to an example.
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        Goto.route('example.tests', {prop1: 'works'})
                    }}>Click</a>
                </ExampleLayout>
            </React.StrictMode>
        );
    }
}