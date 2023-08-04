import React, { PureComponent } from 'react';
import { Input, Form ,Row,Col} from 'antd';
import style from './index.scss';

const { TextArea } = Input;
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
		const { formData } = this.props;
		let formItemLayout = null;
		return (
			<div>
				<ul className={"inputList"}>
					{
						this.state.inputList.map((item, index) => {
							return (
								<li className={"inputListItem"}>
									<Input className={"invoiceInput"}
									 onPressEnter={(e) => this.pressEnter(e, index)} 
									 onChange={(e) => this.invoiceContent(e, index)} 
									 />
								</li>
							);
						})
					}
					<li><button onClick={(e) => this.increFriend()}>+</button></li>
				</ul>
				{ 
				<div>
					<span className={"homeContentTitle"}>内容输出</span>
				<Form layout="vertical" style={{ width: '96%' }}>
					<Row gutter={60}>
						{/* {labelList} */}
						{
							this.state.contentList.map(item => {
								
										return <Col span={item.span}>
										
												<FormItem label={item.label} {...formItemLayout}>
													<Input className={"invoiceInput"} value={formData[item.label] || ''} />
												</FormItem>
											</Col>
								//}
							})
						}
						
					</Row>
				</Form>
			</div>
				}
			
			</div>
		);
	}

	increFriend() {
		const newFris = [...this.state.inputList];
		newFris.push('');
		let arr = [...this.state.contentList];
		arr.push({
			label:'customer'+(arr.length+1),
			span: 12,
			value: ''
		});
		this.setState({
			inputList: newFris
		});
		this.setState({
			contentList:arr
		});
	}

	invoiceContent(e, index) {
		let list = [...this.state.inputList];
		list[index] = e.target.value;
		
		let arr = [...this.state.contentList];
	
		if(e.target.value == '' || e.target.value == null){
			arr[index].label = "customer"+(index+1);
		}else{
			arr[index].label = e.target.value;
		}

		let params = [];
		arr.map(item =>{
			params.push(item.label);
		});
		this.props.changeParamsList(params);
		
		this.setState({
			contentList: arr
		});
		this.setState({
			inputList: list
		});
		
	}
}