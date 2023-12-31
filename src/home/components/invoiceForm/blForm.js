import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import style from './index.scss';

const { TextArea } = Input;
const FormItem = Form.Item;

let labelList = [
	{
		title:"托运人",
		label: 'shipper',
		span: 12,
		value: ''
	}, {
		title:"收货人",
		label: 'consignee',
		span: 12,
		value: ''
	}, {
		title:"收货地点",
		label: 'receivingLocation',
		span: 12,	
		value: ''
	}, {
		title:"船舶名称",
		label: 'vesselName',
		span: 12,
		value: ''
	}, {
		title:"航次",
		label: 'voyage',
		span: 12,
		value: ''
	},
	{
		title:'卸货港',
		label: 'dischargingPort',
		span: 12,
		value: ''
	},
	{
		title:'B/L号码',
		label: 'B/Lnumber',
		span: 12,
		value: ''
	},
	{
		title:'交货地点',
		label: 'placeOfDelivery',
		span: 12,
		value: ''
	},
	{
		title:'货物内容',
		label: 'descriptionOfGoods',
		span: 12,
		value: ''
	}
]
class blForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { formData } = this.props;
		let formItemLayout = null;
		return (
			<div>
				<Form layout="vertical" style={{ width: '96%' }}>
					<Row gutter={60} >
						{/* {labelList} */}
						{
							labelList.map(item => {
								
								if(item.label == '货物内容'){
									return <Col span={item.span} className={"ant-form-item"}  >
									<FormItem label={item.label} {...formItemLayout}>
									 	<TextArea
								 	    value={formData[item.title] || ''}
								 		autoSize={{
								 			minRows: 5,
								 			maxRows: 6,
								 		}}
								 		className={"invoiceInput"}
								 	/>
									</FormItem>
								</Col>

								}

								return <Col span={item.span}>
									<FormItem label={item.title} {...formItemLayout}>
										<Input className={"invoiceInput"} value={formData[item.label] || ''} />
									</FormItem>
								</Col>
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

export default Form.create({ name: 'blForm' })(blForm);