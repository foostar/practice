import React from 'react';
import ReactDOM from 'react-dom';

import {extend,store,classNames} from './util.js';
import app from './app.js'; //控制层

export default class Item extends React.Component{
	render(){
		return (
			<li className={classNames({
				completed:this.props.compile
			})}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={this.props.compile} onChange={this.props.itemChangeHandle}  />
                    <label>{this.props.content}</label>
                    <button className="destroy" onClick={this.props.delectItem}></button>
                </div>
                <input className="edit" defaultValue={this.props.content} />
            </li>		
		)
	}
	
}



