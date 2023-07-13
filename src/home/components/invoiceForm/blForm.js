import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import style from './index.scss';

const { TextArea } = Input;
const FormItem = Form.Item;

class blForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let formItemLayout = null;
		return (
			<div>
				<Form layout="vertical" style={{ width: '96%' }}>
					<Row gutter={60}>
						<Col span={12}>
							<FormItem label="托运人" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="收货人" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="收货地点" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>

						<Col span={12}>
							<FormItem label="船舶名称" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="航次" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="收货地点" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="装货地点" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="卸货港" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="B/L 号码" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="交货地点" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={24}>
							<FormItem label="货物内容" {...formItemLayout}>
								<TextArea
									autoSize={{
										minRows: 5,
										maxRows: 6,
									}}
									className={style.invoiceInput}
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

export default Form.create({ name: 'blForm' })(blForm);