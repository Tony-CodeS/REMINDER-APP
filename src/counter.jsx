import React, { Component } from 'react'
import "./counter.css"

 class counter extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        count: 0
      }
    }

    increment(){
        this.setState({
            count: this.state.count +1
        })
    }

  render() {
    return (
        <div className='main'>
             <div className='count'>counter - {this.state.count} </div>
             <button onClick={() => this.increment()}> Increment</button>
        </div>
      
    )
  }
}

export default counter;