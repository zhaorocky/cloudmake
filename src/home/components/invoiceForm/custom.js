import React, { PureComponent } from 'react';
import { Input, Form } from 'antd';
import style from './index.scss';

const FormItem = Form.Item;

export default class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			inputList: [],
			contentList: []
		};
	}

	render() {
		return (
			<div>
				<ul className={style.inputList}>
					{
						this.state.inputList.map((item, index) => {
							return (
								<li className={style.inputListItem}>
									<Input className={style.invoiceInput} onPressEnter={(e) => this.pressEnter(e, index)} onChange={(e) => this.invoiceContent(e, index)} />
								</li>
							);
						})
					}
					<li><button onClick={(e) => this.increFriend()}>+</button></li>
				</ul>
				<div className={style.inputList}>
					{
						this.state.contentList.map((item, index) => {
							return (
								<FormItem label={item.name} className={style.inputListItem}>
									<Input className={style.invoiceInput} />
								</FormItem>
							);
						})
					}
				</div>
			</div>
		);
	}

	increFriend() {
		const newFris = [...this.state.inputList];
		newFris.push('');
		this.setState({
			inputList: newFris
		});
	}

	invoiceContent(e, index) {
		let list = [...this.state.inputList];
		list[index] = e.target.value;
		this.setState({
			inputList: list
		});
	}

	pressEnter(e, index) {
		let list = [];
		let arr = [...this.state.inputList];
		arr.map((el) => {
			list.push({
				name: el,
				value: ''
			});
		});
		this.setState({
			contentList: list
		});
	}
}