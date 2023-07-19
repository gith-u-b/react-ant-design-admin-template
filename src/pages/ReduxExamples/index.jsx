import React, { Component } from 'react';
import Count from '../../containers/Count';
import Persion from '../../containers/Persion';
class ReduxExamples extends Component {
    render() {
        return (
            <div>
                <Count />
                <Persion />
            </div>
        );
    }
}

export default ReduxExamples;