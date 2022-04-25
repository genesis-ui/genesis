import React from "react";
import {Layout as ExampleLayout} from "../Layout";

export class Welcome extends React.Component {
    render() {
        return (
            <React.StrictMode>
                <ExampleLayout>
                    Welcome to an example.
                </ExampleLayout>
            </React.StrictMode>
        );
    }
}