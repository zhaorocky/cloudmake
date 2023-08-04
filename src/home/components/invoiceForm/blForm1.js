import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import style from './index.scss';

const { TextArea } = Input;
const FormItem = Form.Item;

let labelList = [
	{
		title:"税额",
		label: 'tax',
		span: 12,
		value: ''
	}, {
		title:"商户",
		label: 'store',
		span: 12,
		value: ''
	}, {
		title:"单号",
		label: 'code',
		span: 12,	
		value: ''
	}, {
		title:"时间",
		label: 'date',
		span: 12,
		value: ''
	},{
		title:"金额",
		label: 'amount',
		span: 12,
		value: ''
	}
	
]
class blForm1 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { formData } = this.props;
		let formItemLayout = null;
		return (
			<div>
				<Form layout="vertical" style={{ width: '96%' }}>
					<Row gutter={60}>
						{/* {labelList} */}
						{
							labelList.map(item => {
								// if(item.label == '货物内容'){
								// 	return <Col span={item.span}>
									
								// 	<FormItem label={item.label} {...formItemLayout}>
								// 	<TextArea
								// 	    value={formData[item.label] || ''}
								// 		autoSize={{
								// 			minRows: 5,
								// 			maxRows: 6,
								// 		}}
								// 		className={"invoiceInput"}
								// 	/>
										
								// 	</FormItem>
								// </Col>
								// }else{
										return <Col span={item.span}>
										
												<FormItem label={item.title} {...formItemLayout}>
													<Input className={"invoiceInput"} value={formData[item.label] || ''} />
												</FormItem>
											</Col>
								//}
							})
						}
						{/* <Col span={12}>
							<FormItem label="托运人" {...formItemLayout}>
								<Input className={"invoiceInput"} value={formData['托运人'] || ''} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="收货人" {...formItemLayout}>
								<Input className={"invoiceInput"} value={formData['收货人'] || ''} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="收货地点" {...formItemLayout}>
								<Input className={"invoiceInput"} />
							</FormItem>
						</Col>

						<Col span={12}>
							<FormItem label="船舶名称" {...formItemLayout}>
								<Input className={"invoiceInput"} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="航次" {...formItemLayout}>
								<Input className={"invoiceInput"} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="收货地点" {...formItemLayout}>
								<Input className={"invoiceInput"} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="装货地点" {...formItemLayout}>
								<Input className={"invoiceInput"} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="卸货港" {...formItemLayout}>
								<Input className={"invoiceInput"} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="B/L 号码" {...formItemLayout}>
								<Input className={"invoiceInput"} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="交货地点" {...formItemLayout}>
								<Input className={"invoiceInput"} />
							</FormItem>
						</Col>
						<Col span={24}>
							<FormItem label="货物内容" {...formItemLayout}>
								<TextArea
									autoSize={{
										minRows: 5,
										maxRows: 6,
									}}
									className={"invoiceInput"}
								/>
							</FormItem>
						</Col> */}
					</Row>
				</Form>
			</div>
		);
	}
}

export default Form.create({ name: 'blForm1' })(blForm1);