import React, { Component } from 'react'

export default class RedirectView extends Component {
    componentDidMount() {
        let {location, history} = this.props
        history.replace(location.state.redirect)
    }
    render() {
        return (
            <div>
            
            </div>
        )
    }
}
